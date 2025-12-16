# 5G NF Registration Procedure

In 5G, a new architecture is used (which is called SBA - Service Based Architecture). This architectural approach is new for telecommunication solutions and it is required to add additional procedures on the system itself.

Each node in 5GC is called as a Network Function (NF), and there is not singular connection between NFs in a 5GC system. Instead, every NF uses a connection (like a service bus) to be able to communicate with each other. To do this operation, NFs should be managed from a central location, which is the NRF (Network Repository Function) in 5GC. NRF is a NF itself and responsible to track status of other NFs and make them use on applicable scenarios. In this post we will talk about NF registration procedure on 5GC.

- [5G NF Registration Procedure](#5g-nf-registration-procedure)
  - [Service Communication Proxy - SCP](#service-communication-proxy---scp)
  - [Open5GS](#open5gs)
  - [NF Registration](#nf-registration)
  - [NF Deregistration](#nf-deregistration)


There are two different approach for NF communications in 5GC.
1. Direct Communication
    In direct communication mode, NF should discover their peers by help of NRF, and each NF communicates directly.
2. Indirect Communication (via SCP - Service Communication Proxy)
    In indirect communication, there is another NF which is called SCP, and each NF is connected to SCP. SCP responsibles to message exchange between NFs. Lets dive SCP into more detail.

## Service Communication Proxy - SCP

Before going into deep, I quick want to explain *Service Communication Proxy* - which is an **optional network function** - that supports indirect communication between Network Functions (NFs) in the service-based architecture by routing, forwarding, and optionally performing message inspection and policy enforcement.

![scp-image](https://moniem-tech.com/wp-content/uploads/2023/03/Service-Communication-Proxy-SCP.png)

SCP basically creates a bridge between NFs. With SCP, each NF has a connection point to SCP, and SCP is responsible for message routing. Without SCP, to be able to establish SBA (Service Based Architecture):
- Each NF requires **full mesh connectivity**
- Each NF requires to know **every other NF's addresses** 
- Complex *TLS, retry, load balancing, failover* logics should be placed inside of each NF

We'll be using ![open5gs](https://https://open5gs.org/) project, and it has internal SCP NF inside it. So we will work witn SCP in our NF Registration procedure.

## Open5GS

Open5GS is an open source implementation of 5GC. 

![open5gs](https://open5gs.org/open5gs/assets/images/Open5GS_CUPS-01.jpg)

It has both LTE and 5G core deployments inside and can be easily installed from ![here](https://open5gs.org/open5gs/docs/guide/01-quickstart/).

Open5GS' 5G core consists of:
- NRF - NF Repository Function
- SCP - Service Communication Proxy
- SEPP - Security Edge Protection Proxy
- AMF - Access and Mobility Management Function
- SMF - Session Management Function
- UPF - User Plane Function
- AUSF - Authentication Server Function
- UDM - Unified Data Management
- UDR - Unified Data Repository
- PCF - Policy and Charging Function
- NSSF - Network Slice Selection Function
- BSF - Binding Support Function

Each core element of open5gs is defined as a service and can be easily managed from console. For example to check status of NRF, we can basically type:

```bash
systemctl status open5gs-nrfd
```

## NF Registration

Each NF(Network Function) is supposed to register to NRF so that NRF can coordinate all the NFs whenever necessary.

![nf-registration](https://www.sharetechnote.com/html/5G/image/29_510_Figure_5_2_2_2_2_1.png)

- NF Service Consumer : Every Network Function (Core Network Components) except NRF itself.
- URI : The URI of the NF that wants to get registered
- nfInstanceID : UUID within the PLMN (e.g, 4947a69a-f61b-4bc1-b9da-47c9c5d14b64)
- NFProfile : Network Function Profile which can carry a huge list of information.

Now, let's simulate the scenario on open5gs. We will register our SCP to NRF. First of all lets stop all services and open Wireshark.

```bash
systemctl stop open5gs*
```

After start NRF first.

```bash
systemctl start open5gs-nrfd
```

When NRF starts, we can start SCP next, and wait for NF registration for SCP.

```bash
systemctl start open5gs-scpd
```

Observe Wireshark and we should see `POST` request for SCP registration. An example snapshot is given below:

![5g-ssc-req](/blogPost/5gc-nf-1.png)


When we deeply investigate post request's data, we have:

```
Frame 60: 313 bytes on wire (2504 bits), 313 bytes captured (2504 bits) on interface -, id 0
Linux cooked capture v2
Internet Protocol Version 4, Src: 10.3.0.60, Dst: 10.3.0.65
Transmission Control Protocol, Src Port: 46156, Dst Port: 7777, Seq: 262, Ack: 1, Len: 241
HyperText Transfer Protocol 2
    Stream: DATA, Stream ID: 1, Length 232
        Length: 232
        Type: DATA (0)
        Flags: 0x01, End Stream
            0000 .00. = Unused: 0x00
            .... 0... = Padded: False
            .... ...1 = End Stream: True
        0... .... .... .... .... .... .... .... = Reserved: 0x0
        .000 0000 0000 0000 0000 0000 0000 0001 = Stream Identifier: 1
        [Pad Length: 0]
        Data: 7b226e66496e7374616e63654964223a2261663939613132322d646134342d343166302d…
    JavaScript Object Notation: application/json
        Object
            Member: nfInstanceId
                [Path with value: /nfInstanceId:af99a122-da44-41f0-8934-bf83ea6531c2]
                [Member with value: nfInstanceId:af99a122-da44-41f0-8934-bf83ea6531c2]
                String value: af99a122-da44-41f0-8934-bf83ea6531c2
                Key: nfInstanceId
                [Path: /nfInstanceId]
            Member: nfType
                [Path with value: /nfType:SCP]
                [Member with value: nfType:SCP]
                String value: SCP
                Key: nfType
                [Path: /nfType]
            Member: nfStatus
                [Path with value: /nfStatus:REGISTERED]
                [Member with value: nfStatus:REGISTERED]
                String value: REGISTERED
                Key: nfStatus
                [Path: /nfStatus]
            Member: ipv4Addresses
                Array
                    [Path with value: /ipv4Addresses/[]:10.3.0.71]
                    [Member with value: []:10.3.0.71]
                    String value: 10.3.0.71
                Key: ipv4Addresses
                [Path: /ipv4Addresses]
            Member: priority
                [Path with value: /priority:0]
                [Member with value: priority:0]
                Number value: 0
                Key: priority
                [Path: /priority]
            Member: capacity
                [Path with value: /capacity:100]
                [Member with value: capacity:100]
                Number value: 100
                Key: capacity
                [Path: /capacity]
            Member: load
                [Path with value: /load:0]
                [Member with value: load:0]
                Number value: 0
                Key: load
                [Path: /load]
            Member: nfProfileChangesSupportInd
                [Path with value: /nfProfileChangesSupportInd:true]
                [Member with value: nfProfileChangesSupportInd:true]
                True value
                Key: nfProfileChangesSupportInd
                [Path: /nfProfileChangesSupportInd]
            Member: scpInfo
                Object
                    Member: scpPorts
                        Object
                            Member: http
                                [Path with value: /scpInfo/scpPorts/http:7777]
                                [Member with value: http:7777]
                                Number value: 7777
                                Key: http
                                [Path: /scpInfo/scpPorts/http]
                        Key: scpPorts
                        [Path: /scpInfo/scpPorts]
                Key: scpInfo
                [Path: /scpInfo]
```

We can easily say that that request has `nfType` of SCP. And as an answer, we have `201 Created` answer. From that we can say that SCP is registered to NRF.

```
Frame 68: 260 bytes on wire (2080 bits), 260 bytes captured (2080 bits) on interface -, id 0
Linux cooked capture v2
Internet Protocol Version 4, Src: 10.3.0.65, Dst: 10.3.0.60
Transmission Control Protocol, Src Port: 7777, Dst Port: 46156, Seq: 141, Ack: 503, Len: 188
HyperText Transfer Protocol 2
    Stream: DATA, Stream ID: 1, Length 179
        Length: 179
        Type: DATA (0)
        Flags: 0x01, End Stream
            0000 .00. = Unused: 0x00
            .... 0... = Padded: False
            .... ...1 = End Stream: True
        0... .... .... .... .... .... .... .... = Reserved: 0x0
        .000 0000 0000 0000 0000 0000 0000 0001 = Stream Identifier: 1
        [Pad Length: 0]
        Data: 7b226e66496e7374616e63654964223a2261663939613132322d646134342d343166302d…
    JavaScript Object Notation: application/json
        Object
            Member: nfInstanceId
                [Path with value: /nfInstanceId:af99a122-da44-41f0-8934-bf83ea6531c2]
                [Member with value: nfInstanceId:af99a122-da44-41f0-8934-bf83ea6531c2]
                String value: af99a122-da44-41f0-8934-bf83ea6531c2
                Key: nfInstanceId
                [Path: /nfInstanceId]
            Member: nfType
                [Path with value: /nfType:SCP]
                [Member with value: nfType:SCP]
                String value: SCP
                Key: nfType
                [Path: /nfType]
            Member: nfStatus
                [Path with value: /nfStatus:REGISTERED]
                [Member with value: nfStatus:REGISTERED]
                String value: REGISTERED
                Key: nfStatus
                [Path: /nfStatus]
            Member: heartBeatTimer
                [Path with value: /heartBeatTimer:10]
                [Member with value: heartBeatTimer:10]
                Number value: 10
                Key: heartBeatTimer
                [Path: /heartBeatTimer]
            Member: plmnList
                Array
                    Object
                        Member: mcc
                            [Path with value: /plmnList/[]/mcc:999]
                            [Member with value: mcc:999]
                            String value: 999
                            Key: mcc
                            [Path: /plmnList/[]/mcc]
                        Member: mnc
                            [Path with value: /plmnList/[]/mnc:70]
                            [Member with value: mnc:70]
                            String value: 70
                            Key: mnc
                            [Path: /plmnList/[]/mnc]
                Key: plmnList
                [Path: /plmnList]
            Member: nfProfileChangesInd
                [Path with value: /nfProfileChangesInd:true]
                [Member with value: nfProfileChangesInd:true]
                True value
                Key: nfProfileChangesInd
                [Path: /nfProfileChangesInd]
```

So by this operation, we were able to make a NF registration on open5GS.

## NF Deregistration

To simulate opposite operation (NF de-register) we can basically stop SCP service.

```bash
systemctl stop open5gs-scpd
```

and on wireshark we should see a `DELETE` request like shown below:

![5gc-nf-2](/blogPost/5gc-nf-2.png)

This is how NF-deregister operation being held on 5GC.

As a tip, for debug operations we can easily follow logs of NRF, which is accessible at `/var/log/open5gs/nrf.log`. We have following logs during the operation:

![5gc-nf-3](/blogPost/5gc-nf-3.png)