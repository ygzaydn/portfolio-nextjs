# Service Selection and Continuity in 5G

- [Service Selection and Continuity in 5G](#service-selection-and-continuity-in-5g)
  - [SSC Mode 1 - Keep IP Address](#ssc-mode-1---keep-ip-address)
  - [SSC Mode 2 - Release and re-establish](#ssc-mode-2---release-and-re-establish)
  - [SSC Mode 3 - Dual session](#ssc-mode-3---dual-session)
  - [SSC Determination for PDU](#ssc-determination-for-pdu)


There is a **Session and Service Continuity (SSC)** concept has been defined thanks to 5GC. SSC defines how a UE's PDU Session is hangled in scenarios of mobility or relocation. This concept has been developed and defined in much more detail in 5G.

In LTE, PDN connection was anchored in a PGW. The UE usually kept the same IP as long as it stayed on the same PGW. For almost most of the cases, UE uses same PGW and same IP address as it gets service in case of mobility. But in 5G, things get a bit more detailed.

In 5GC, the UPF (equivalent of PGW-U) is flexible and relocatable (for load balancing, edge computing or inter-PLMN mobility). Therefore 5GC introduces SSC Modes to give control and flexibility over sessions.

In this blog post, I'll try to explain those SSC modes.

> SSC modes are defined 3GPP TS23.501, TS24.501 and TS23.502.

There are three different SSC modes defined in 5GC standarts. Let's get into them.

## SSC Mode 1 - Keep IP Address

SSC Mode 1 has same operation that we had in LTE. UE always keeps same IP address for its PDU session regardless of mobility or UPF relocation. In SSC Mode 1, SMF ensures session continuity by keeping the UE bound to the same PDU anchor. If the session anchor must change but we can not keep the IP, the session fails and gets re-establish. This is the closest form of SSC to the LTE PDN continuity.

> Use cases for SSC Mode-1: IMS sessions, MCX services, enterprise VPNs

![SSC-image](https://www.3gpp.org/images/articleimages/architecture_image05a.jpg)

## SSC Mode 2 - Release and re-establish

SSC Mode 2 is a bit different than SSC Mode 1, and that is where service selection and continuity starts changing with 5GC. In SSC Mode 2, in the case of PDU session anchor change, the network releases the old session and establishes a new one. The UE receives a new IP address. Applications that do not care about IP changes can and session re-establishment can tolerate this mode. Main goal is to move UE's UPF closest to location of that particular UE.

> Use cases for SSC Mode-2: OTT Apps with retry logic, IoT devices with burst transmissions, Browsing, Low priority data sessions


## SSC Mode 3 - Dual session

SSC Mode 3 is the most complicated and desired way to handle mobility in case of service continuity. The network establishes a new PDU session with new IP before releasing the old one. The UE temporarily holds two active PDU sessions for some applications/services. UE allows applications to migrate traffic gracefully. This migration is seamless on application level.

> Use cases for SSC Mode-3: Vide streaming, cloud gaming


## SSC Determination for PDU

When a new PDU is asked by UE, the 5GC should determine the SSC mode for asked PDU session. SMF is responsible for this operation. When a new PDU is asked, UE sends *PDU Session Establishment Request* message to SMF. Inside that message, there is a field called *SSC Mode* that describes the SSC list for that PDU. In this message, UE can either send a single SSC mode or a list. An example request message can be seen below:

![5g-ssc-req](/blogPost/5g-ssc-req.png)


SMF evaluates UE subscription policy and local constraints and sends *PDU Session Establishment Accept* message to the UE with the finalized SSC mode. An example answer message can be seen below:

![5g-ssc-resp](/blogPost/5g-ssc-resp.png)

After this transaction, PDU is created with desired SSC mode and UE can start to use this PDU.