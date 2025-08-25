# RRC States in 5G

There are three different state machine in 5G network to track current state of the subscriber. They are connection management, registration management and RRC state.

In this post, we will try to explain RRC states in 5G.

- [RRC States in 5G](#rrc-states-in-5g)
  - [Brief information about RRC states](#brief-information-about-rrc-states)
  - [RRC States in 5G](#rrc-states-in-5g-1)
    - [RRC Idle](#rrc-idle)
    - [RRC Connected](#rrc-connected)
    - [RRC Inactive](#rrc-inactive)

## Brief information about RRC states

The RRC (Radio Resource Control) state machine defines how a UE interacts with the RAN and Core in terms of signaling, mobility, and resource usage.

This state machine was firstly presented in LTE, and enhanced in 5G. It is deeply explained in 3GPP standarts.

1. In LTE, we have RRC_IDLE and RRC_CONNECTED states (3GPP TS 36.331)
2. In 5G NR, a new state was introduced: RRC_INACTIVE (3GPP TS 38.331, TS 23.501)

## RRC States in 5G

### RRC Idle

In RRC Idle state, UE is registered to the network but not actively connected. Main reason is to have this state to make UE's have better battery efficiency. When UE's does not do any DL/UL traffic, it is not necessary to have data paths, so in idle mode 5G system knows that UE is registered, but data traffic is not active. This state was present on LTE core network aswell.

Main characteristics of this state:
-   No dedicated radio bearers are present; only NAS info is maintained.
-   UE can still perform cell selection/reselection.
-   Discontinous Reception (DRX) is applied for power savings.
-   Paging is used by the AMF via gNB to reach the UE.
-   UE has to do RRC Connection Establishment before sending UL data.
  
### RRC Connected

In RRC Connected state, UE is registered to network and actively transferring data, so it has active signalling connection with the gNB and active NG-RAN 5GC context. Similar to RRC Idle state, RRC Connected state was presented on LTE core network and 5GC utilizes it.

Main characteristics of this state:
-   Dedicated radio sources are configured.
-   UE has a C-RNTI (Cell Radio Network Temporary Identifier) and gNB knows its exact cell location.
-   It supports active mobility (handover).
-   Thanks to established resources, latency is low for UL/DL data.
-   Paging is not needed in this state, because gNB directly schedules data.
  
### RRC Inactive

RRC Inactive state can be defined as a hybrid satate between Idle and Connected states. This state is introduced in 5G for latency-power optimization. In LTE we do not have this state.

Main characteristics of this state:
-   UE has an RRC Inactive context stored in both UE and gNB.
-   The Ue does not release all signalling context like in Idle mode. This procedure avoids full RRC re-establishment when UE needs to do data again.
-   UE is reachable via paging but this procedure is faster than Idle mode.
-   UE knows its own RNA (Ran-based notification area). RNA is similar to TA (tracking area) in Idle mode but its at gNB level instead of core.
-   This state is suitable for applications with interminttent activity (e.g. chat apps, push notifications)
-   For mobility, only RNA updates are done, not full handover.


![img](https://www.techplayon.com/wp-content/uploads/2017/11/RRC-State-Trasitions.png)

RRC states are explained in detailed on 3GPP TS 23.501 and 3gpp TS 38.300, for detailed information, those TS's are the best resource.
