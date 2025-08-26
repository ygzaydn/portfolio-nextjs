# From LTE Bearers to 5G QoS Flows

Mobile core networks have undergone a major transformation in the move from LTE’s EPC to the 5G Core (5GC). This post explores how session management has evolved: **from PDN connections and EPS bearers in LTE → to PDU Sessions and QoS Flows in 5G.**

---

- [From LTE Bearers to 5G QoS Flows](#from-lte-bearers-to-5g-qos-flows)
  - [LTE: Bearer-Centric Model](#lte-bearer-centric-model)
  - [5G Core: Session - Flow Model](#5g-core-session---flow-model)
  - [Comparison](#comparison)
  - [Summary](#summary)

---

## LTE: Bearer-Centric Model

In LTE, connectivity between the user equipment (UE) and an external network, called a Packet Data Network (PDN), is established through a **PDN connection**. Each PDN connection is identified by an **APN (Access Point Name)**, which tells the core network which external service or operator network the user wants to access. The PDN connection is anchored at the **PGW (Packet Data Network Gateway)**, which allocates the UE’s IP address and becomes the permanent anchor for all mobility procedures.

The smallest unit of QoS in LTE is the **EPS bearer**. Every PDN connection comes with a default bearer that provides basic connectivity, usually best-effort, while additional dedicated bearers can be established for services requiring specific QoS guarantees. Each bearer is characterized by parameters such as **QCI (QoS Class Identifier)**, which defines delay and reliability expectations, and **GBR/MBR (Guaranteed and Maximum Bit Rate)** for flows that require dedicated bandwidth. Bearers are also associated with **ARP (Allocation and Retention Priority)**, which controls admission in congestion scenarios, and with a **TFT (Traffic Flow Template)** that determines which IP flows are mapped onto which bearer.

Although effective for LTE, this bearer-based model was rigid. Each new QoS requirement forced the creation of a new bearer, adding signaling overhead and complexity. Moreover, the PGW acted as a fixed anchor point, centralizing user traffic and limiting flexibility in service delivery.

![lte-bearer](https://i0.wp.com/mobilepacketcore.com/wp-content/uploads/2018/12/EPS-Bearer-1.png?resize=1024%2C376&ssl=1)

**Example – Mission Critical Push-to-Talk (MCPTT) in LTE:**
When a UE initiates an MCPTT call, the IMS and PCRF request the establishment of a dedicated bearer with **QCI 65**, which is defined for mission-critical signaling and media. The PGW assigns a dedicated GBR bearer with guaranteed bandwidth and strict latency requirements. The bearer setup ensures that MCPTT voice packets are isolated from best-effort traffic, achieving the low latency and reliability needed for public safety communications.

## 5G Core: Session - Flow Model

5G introduces a far more flexible framework. Instead of PDN connections, the UE establishes **PDU Sessions** with a **Data Network (DN)**. A PDU Session is a top-level logical association—think of it as an umbrella connection—that groups all traffic between the UE and the DN. Each session is identified by a **DNN (Data Network Name)**, which serves the same role as the APN in LTE. Unlike LTE’s fixed PGW anchoring, in 5G the session is anchored at a **PSA UPF (PDU Session Anchor)**, and the UPF role itself can be split across different functions. An **UL-CL (Uplink Classifier)** can steer traffic to different anchors, while an **I-UPF (Intermediate UPF)** can support mobility or edge breakout closer to the user. This distribution allows the operator to place anchors and classifiers strategically for latency reduction or enterprise-specific routing.

The most important conceptual change is how QoS is enforced. Instead of bearers, 5G uses **QoS Flows**. Every PDU Session has at least one default QoS Flow, and additional flows can be created dynamically for different service requirements. Each QoS Flow is identified by a **QFI (QoS Flow Identifier)**. The QFI itself is just a tag, but it maps to a policy that includes multiple QoS parameters: **5QI (5G QoS Identifier)** defines latency and reliability characteristics; **GFBR/MFBR** (Guaranteed and Maximum Flow Bit Rate) set throughput boundaries for GBR flows; **ARP** remains to manage admission priority; and **Reflective QoS** can let the UE copy downlink QoS rules for uplink traffic without explicit signaling. Classification of packets into flows is managed by **QoS Rules**, which are conceptually similar to LTE’s TFT but are more flexible. On the radio side, the gNB maps flows into **Data Radio Bearers (DRBs)**, where non-GBR flows may share a DRB while GBR flows often get their own dedicated one.

![5g-qos-flow](https://devopedia.org/images/article/329/1778.1617884803.jpg)

**Example – Mission Critical Push-to-Talk (MCPTT) in 5G:**
In 5G, the same MCPTT application establishes a **PDU Session** towards the mission-critical services DN. Inside this session, the SMF and PCF provision a **dedicated QoS Flow** with a specific **QFI** mapped to standardized **5QI 65**, designed for mission-critical voice and signaling. Instead of creating an entirely new bearer, the new QoS Flow is simply added to the existing session. This flow is given GBR parameters and strict delay budgets, ensuring ultra-reliable low latency. The gNB then maps this QoS Flow to a DRB dedicated for MCPTT, while best-effort traffic remains in the default QoS Flow. The model is more efficient: no need for a new PDN connection or bearer, just an additional flow inside the same umbrella session.

## Comparison

Below you can find a brief comparison of two technologies:

| Aspect                 | LTE (EPC)                    | 5G Core (5GC)                    |
| ---------------------- | ---------------------------- | -------------------------------- |
| **Top-level session**  | PDN Connection               | PDU Session                      |
| **Identifier**         | APN                          | DNN                              |
| **Anchor**             | PGW (fixed)                  | PSA UPF (relocatable, chainable) |
| **QoS unit**           | EPS Bearer                   | QoS Flow                         |
| **QoS ID**             | QCI                          | QFI → 5QI                        |
| **Bitrate control**    | GBR/MBR                      | GFBR/MFBR                        |
| **Admission priority** | ARP                          | ARP (same role)                  |
| **Classifier**         | TFT                          | QoS Rules                        |
| **MCPTT Example**      | Dedicated bearer with QCI 65 | Dedicated QoS Flow with 5QI 65   |

## Summary

LTE was built around a **bearer-centric model**, where each bearer combined connectivity and QoS characteristics. This created overhead and rigidity, with the PGW acting as a fixed anchor for all sessions. In contrast, 5G introduces a **session + flow model**. A PDU Session represents the umbrella logical connection between a UE and a DN, while fine-grained QoS differentiation is achieved through QoS Flows identified by QFIs. UPF functions are distributed and relocatable, allowing for service-based traffic steering, edge breakout, and latency optimization. QoS flows can be dynamically created or adjusted without requiring the establishment of new sessions, giving operators and applications far greater flexibility. The MCPTT example shows how 5G simplifies session management by adding flows instead of building new bearers, reducing overhead while improving scalability.

**3GPP References**

* TS 23.501 – System Architecture for 5G System
* TS 23.502 – Procedures for the 5G System
* TS 23.203 – Policy and Charging Control Framework
