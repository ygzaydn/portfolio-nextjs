# HTTP2 in 5G Core

- [HTTP2 in 5G Core](#http2-in-5g-core)
  - [Why a 5G Core Engineer Should Care](#why-a-5g-core-engineer-should-care)
  - [What Is HTTP/2](#what-is-http2)
    - [1. Binary Framing Layer](#1-binary-framing-layer)
    - [2. Multiplexing (Streams)](#2-multiplexing-streams)
    - [3. Header Compression (HPACK)](#3-header-compression-hpack)
    - [4. Flow Control](#4-flow-control)
  - [HTTP/2 in 5GC SBA](#http2-in-5gc-sba)
    - [3GPP-Specific Headers That Help Tracing](#3gpp-specific-headers-that-help-tracing)
  - [Wireshark Techniques That Actually Work for 5GC](#wireshark-techniques-that-actually-work-for-5gc)
    - [1. Identify HTTP/2 Quickly](#1-identify-http2-quickly)
    - [2. Track a Single SBI Transaction: Stream ID](#2-track-a-single-sbi-transaction-stream-id)
    - [3. Follow Streams](#3-follow-streams)
    - [4. What to Read First in Decoded HTTP/2](#4-what-to-read-first-in-decoded-http2)
  - [Correlating PCAP with NF Logs](#correlating-pcap-with-nf-logs)
    - [1. Use Correlation Headers When Present](#1-use-correlation-headers-when-present)
    - [2 Correlate by API Paths](#2-correlate-by-api-paths)
    - [3 Time-Correlation Still Matters](#3-time-correlation-still-matters)
  - [Common 5GC HTTP/2 Pitfalls](#common-5gc-http2-pitfalls)
  - [Example HTTP/2 flow for 5GC](#example-http2-flow-for-5gc)


## Why a 5G Core Engineer Should Care
5G Core’s Service-Based Architecture (SBA) is *HTTP-native*. Network Functions (NFs) expose REST-like APIs (OpenAPI-defined) and exchange requests/responses over **HTTP/2**—typically protected by **TLS**. In practical troubleshooting, this means: if you cannot interpret HTTP/2 streams, headers, and TLS decryption options, your 5GC packet captures will look like opaque encrypted blobs.

3GPP explicitly anchors this choice. TS 29.500 defines the SBI protocol stack as **HTTP/2 over TLS over TCP/IP**, and states that SBI uses HTTP/2 with JSON payloads.

## What Is HTTP/2

HTTP/2 is not “HTTP/1.1 but faster.” It changes the wire format and the concurrency model. So it is necessary to have at least brief information about HTTP/2 before diving into 5GC debugging. In 4 small pieces, HTTP/2 can be explained as follows:

### 1. Binary Framing Layer
HTTP/2 uses binary frames (not plain-text messages). Requests and responses are built from frame sequences:
- **HEADERS**: carries pseudo-headers like `:method`, `:path`, `:authority`, plus regular headers.
- **DATA**: carries body (e.g., JSON).
- **SETTINGS / WINDOW_UPDATE**: connection and flow-control mechanics.

So instead of single blob, we should at least 2 entry on Wireshark while looking a single HTTP/2 request/response.

### 2. Multiplexing (Streams)
Multiple independent **streams** share the same single TCP connection. This is the key mental model shift:
- One TCP connection between (say) AMF ↔ SMF can carry many simultaneous SBI transactions.
- Each transaction maps to a **stream ID** (odd/even allocation depends on who initiates).

As a result, we can check **stream ID** while tracking the messages. HEADERS and DATA fields from same HTTP/2 request/response will have same **stream ID**.

### 3. Header Compression (HPACK)
Headers are compressed, so “what you see on the wire” is not literal headers unless your tool decodes them. `HEADERS` basically gives us about the attribute names on a JSON but not the value. Real data resides in `DATA` part of HTTP/2.

### 4. Flow Control
HTTP/2 applies flow control at both connection and stream level, which can matter when large JSON bodies or bursty notifications occur.

**5GC impact:** when troubleshooting “latency,” “timeouts,” “retries,” or “stalls,” you often need to look at stream concurrency, WINDOW_UPDATE behavior, and whether multiple SBI procedures are sharing one congested TCP/TLS session. (But to be honest, this is a bit advanced topic, and for starters this matter can be ignored.)

## HTTP/2 in 5GC SBA

3GPP TS 29.500 states that **HTTP/2 (IETF RFC 7540) shall be used** on the Service Based Interface (SBI). So expect lots of HTTP/2 messages in your traces. 

TS 29.500 also states that NFs **shall support TLS**, and TLS **shall be used within a PLMN if network security is not provided by other means**, referring to the 5G security architecture (TS 33.501). But it can be flexible for demo setups and once you have TLS setup, actually data itself does not change.

**Operational takeaway:** Most real 5GC captures will show **TLS-encrypted HTTP/2**, so meaningful application-layer tracing typically requires (1) key logs, (2) a controlled test environment, or (3) NF-side logging/telemetry that exposes decoded SBI details.

### 3GPP-Specific Headers That Help Tracing
TS 29.500 defines custom headers used by 5GC nodes and intermediaries (SCP/SEPP), including:
- **`3gpp-Sbi-Correlation-Info`**: may carry correlation info (e.g., UE identifier) useful for troubleshooting and offline analysis.
- **`3gpp-Sbi-Callback`**: indicates callback/notification semantics; required for certain callback cases (e.g., indirect comms / SEPP scenarios).

**Practical takeaway:** if you can decrypt, these headers are often the fastest path to correlate PCAP ↔ NF logs ↔ subscriber context. But not all core deployments uses those fields, so do not only focus to those fields.

## Wireshark Techniques That Actually Work for 5GC

### 1. Identify HTTP/2 Quickly
- Use display filter: `http2` (we generally use much more deeper filters - like `http2.data.data || http2.headers || ngap || nas-5gs`, but as starter it is ok.)
- If ports are nonstandard, “Decode As…” can help (TCP port → HTTP/2), but ALPN-based detection usually works when visible. (core implementations generally use standardized ports for HTTP/2 traffic, but always consider custom ports if you realize that some messages are missing on your traces)

Wireshark documents HTTP/2 protocol support and typical port usage patterns.

### 2. Track a Single SBI Transaction: Stream ID
The most important field for SBA tracing is **stream ID**:
- Display filter: `http2.streamid == <N>`
Wireshark’s filter reference includes `http2.streamid` and related fields.

**Mental model:**  
One SBI request/response exchange maps to one stream. Notifications are typically additional streams (often same connection, sometimes different).

### 3. Follow Streams
Wireshark supports “Follow … Stream” for multiple protocols including HTTP/2. If you select a packet that contains decoded HTTP/2, you can follow the conversation more cleanly.

### 4. What to Read First in Decoded HTTP/2
When decrypted/decoded, start from:
- `:method` (GET/POST/PATCH/DELETE)
- `:path` (this often reveals the exact SBI API and resource - this actually can give lots of information about the request itself.)
- `:authority` (target host)
- Status code (e.g., `200`, `201`, `404`, `500`)
- JSON body (ProblemDetails on errors is common in SBA implementations)

## Correlating PCAP with NF Logs

Now, we have HTTP/2 messages as we desire, but the 5GC part now takes into accout. We should be able to reason every message by deeply investigate it and get more information about our deployments. That is where actually core network engineers should works and need to be educated. Here are some quick tips:

### 1. Use Correlation Headers When Present
If `3gpp-Sbi-Correlation-Info` is present, it can carry UE-related correlation data that is ideal for tying:
- UE procedure (registration / PDU session)
- NF logs (per-UE context)
- SBI transactions (requests/responses/subscriptions/notifications)

### 2 Correlate by API Paths
As I have indicated above, even without special headers, `:path` typically includes recognizable service roots:
- `/nnrf-disc/...` (NRF discovery)
- `/nsmf-pdusession/...` (SMF PDU session context)
- `/nausf-auth/...` (AUSF authentication)
- `/nudm-uecm/...`, `/nudm-sdm/...` (UDM)
- `/npcf-...` (PCF)
This helps you map “a log line” to “a specific HTTP/2 stream.” (To be honest, this is the first field that I'm looking while debugging. )

### 3 Time-Correlation Still Matters
Sometimtes Wireshark log itself can not be enough to debug the system. If you cannot decrypt, align:
- NF timestamps (logs)
- TCP session timestamps (pcap)
- TLS handshake times (pcap)
- Always think for custom port implementations if you think you are missing some messages.

## Common 5GC HTTP/2 Pitfalls

1) **Many parallel streams, one congested TCP**  
Multiplexing reduces connection count, but it can make head-of-line issues at TCP level more impactful during loss. Always keep your focus on **stream IDs**.

2) **TLS hides everything unless you plan for it**  
Without key logs, you’re limited to transport symptoms.

3) **Notifications look “asymmetric”**  
Subscriptions + callbacks often create traffic patterns that confuse HTTP/1.1 instincts. The `3gpp-Sbi-Callback` header exists precisely to clarify callback semantics in certain scenarios.

## Example HTTP/2 flow for 5GC

I provide an example HTTP/2 flow to make this topic clearer. The section that we'll be talking about a `GET`subscription data during subscriber registration. A flow is given below:

![5gc-http2-overall](/blogPost/5gc-http2-overall.png)

When we look at the section, UDM wants to get subscription data for a specific user. All of those informations can be actually readable from path of the request of stream ID 1513. The path is given below:

```/nudr-dr/v1/subscription-data/imsi-999700000000001/authentication-data/authentication-subscription```

Let me give you full message from first request:

```yaml
Frame 1169: 187 bytes on wire (1496 bits), 187 bytes captured (1496 bits) on interface any, id 0
Linux cooked capture v1
Internet Protocol Version 4, Src: udm (10.10.10.14), Dst: scp (10.10.10.11)
Transmission Control Protocol, Src Port: 42198, Dst Port: 7777, Seq: 203, Ack: 36, Len: 119
HyperText Transfer Protocol 2
    Stream: HEADERS, Stream ID: 1513, Length 110, GET /nudr-dr/v1/subscription-data/imsi-999700000000001/authentication-data/authentication-subscription
        Length: 110
        Type: HEADERS (1)
        Flags: 0x05, End Headers, End Stream
        0... .... .... .... .... .... .... .... = Reserved: 0x0
        .000 0000 0000 0000 0000 0101 1110 1001 = Stream Identifier: 1513
        [Pad Length: 0]
        Header Block Fragment: 8204c362ab64b1692c63b85845b1a0961ab498f52d20d2360d4a0cb3efbee80000000000…
        [Header Length: 391]
        [Header Count: 11]
        Header: :method: GET
            Name Length: 7
            Name: :method
            Value Length: 3
            Value: GET
            :method: GET
            [Unescaped: GET]
            Representation: Indexed Header Field
            Index: 2
        Header: :path: /nudr-dr/v1/subscription-data/imsi-999700000000001/authentication-data/authentication-subscription
            Name Length: 5
            Name: :path
            Value Length: 98
            Value: /nudr-dr/v1/subscription-data/imsi-999700000000001/authentication-data/authentication-subscription
            :path: /nudr-dr/v1/subscription-data/imsi-999700000000001/authentication-data/authentication-subscription
            [Unescaped: /nudr-dr/v1/subscription-data/imsi-999700000000001/authentication-data/authentication-subscription]
            Representation: Literal Header Field without Indexing - Indexed Name
            Index: 4
        Header: :scheme: http
            Name Length: 7
            Name: :scheme
            Value Length: 4
            Value: http
            :scheme: http
            [Unescaped: http]
            Representation: Indexed Header Field
            Index: 6
        Header: <unknown>: 
            Name Length: 9
            Name: <unknown>
            Value Length: 0
            Value: 
            [Unescaped: ]
            Representation: Indexed Header Field
            Index: 73
        Header: <unknown>: Mon, 29 Dec 2025 12:33:53.450 GMT
            Name Length: 9
            Name: <unknown>
            Value Length: 33
            Value: Mon, 29 Dec 2025 12:33:53.450 GMT
            [Unescaped: Mon, 29 Dec 2025 12:33:53.450 GMT]
            Representation: Literal Header Field with Incremental Indexing - Indexed Name
            Index: 63
        Header: 3gpp-sbi-target-apiroot: http://10.10.10.18:7777
            Name Length: 23
            Name: 3gpp-sbi-target-apiroot
            Value Length: 23
            Value: http://10.10.10.18:7777
            [Unescaped: http://10.10.10.18:7777]
            Representation: Indexed Header Field
            Index: 63
        Header: <unknown>: 
            Name Length: 9
            Name: <unknown>
            Value Length: 0
            Value: 
            [Unescaped: ]
            Representation: Indexed Header Field
            Index: 69
        Header: 3gpp-sbi-discovery-service-names: nudr-dr
            Name Length: 32
            Name: 3gpp-sbi-discovery-service-names
            Value Length: 7
            Value: nudr-dr
            [Unescaped: nudr-dr]
            Representation: Indexed Header Field
            Index: 67
        Header: user-agent: UDM
            Name Length: 10
            Name: user-agent
            Value Length: 3
            Value: UDM
            user-agent: UDM
            [Unescaped: UDM]
            Representation: Literal Header Field with Incremental Indexing - Indexed Name
            Index: 58
        Header: <unknown>: UDR
            Name Length: 9
            Name: <unknown>
            Value Length: 3
            Value: UDR
            [Unescaped: UDR]
            Representation: Indexed Header Field
            Index: 67
        Header: <unknown>: 
            Name Length: 9
            Name: <unknown>
            Value Length: 0
            Value: 
            [Unescaped: ]
            Representation: Indexed Header Field
            Index: 73
```

Please check `user-agent` field of the message. Here, it is clear that UDM wants the data.

So lets read the flow. From given flow, we say read that a request is made to `UDR`, it wants `subsciption-data` for `imsi-999700000000001`, especially for `authentication-data/authentication-subscription`. This is an excellent example of reading `PATH` of HTTP/2 requests.

To forward message to `UDR`, `UDM` sends message to `SCP` and `SCP` forwards it to `UDR`. `UDR` replies back to `UDM` via `SCP` with data:

```yaml
JavaScript Object Notation: application/json
    Object
        Member: authenticationMethod
            [Path with value: /authenticationMethod:5G_AKA]
            [Member with value: authenticationMethod:5G_AKA]
            String value: 5G_AKA
            Key: authenticationMethod
            [Path: /authenticationMethod]
        Member: encPermanentKey
            [Path with value: /encPermanentKey:465b5ce8b199b49faa5f0a2ee238a6bc]
            [Member with value: encPermanentKey:465b5ce8b199b49faa5f0a2ee238a6bc]
            String value: 465b5ce8b199b49faa5f0a2ee238a6bc
            Key: encPermanentKey
            [Path: /encPermanentKey]
        Member: sequenceNumber
            Object
                Member: sqn
                    [Path with value: /sequenceNumber/sqn:0000000003a1]
                    [Member with value: sqn:0000000003a1]
                    String value: 0000000003a1
                    Key: sqn
                    [Path: /sequenceNumber/sqn]
            Key: sequenceNumber
            [Path: /sequenceNumber]
        Member: authenticationManagementField
            [Path with value: /authenticationManagementField:8000]
            [Member with value: authenticationManagementField:8000]
            String value: 8000
            Key: authenticationManagementField
            [Path: /authenticationManagementField]
        Member: encOpcKey
            [Path with value: /encOpcKey:e8ed289deba952e4283b54e88e6183ca]
            [Member with value: encOpcKey:e8ed289deba952e4283b54e88e6183ca]
            String value: e8ed289deba952e4283b54e88e6183ca
            Key: encOpcKey
            [Path: /encOpcKey]
```

