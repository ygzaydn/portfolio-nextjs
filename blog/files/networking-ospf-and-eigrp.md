# Configuring OSPF and EIGRP on Cisco Layer 3 Switches

- [Configuring OSPF and EIGRP on Cisco Layer 3 Switches](#configuring-ospf-and-eigrp-on-cisco-layer-3-switches)
  - [Understanding Layer 3 Switching](#understanding-layer-3-switching)
  - [Overview of OSPF (Open Shortest Path First)](#overview-of-ospf-open-shortest-path-first)
  - [Overview of EIGRP (Enhanced Interior Gateway Routing Protocol)](#overview-of-eigrp-enhanced-interior-gateway-routing-protocol)
  - [Network Scenario for Configuration](#network-scenario-for-configuration)
    - [OSPF Configuration Example](#ospf-configuration-example)
    - [EIGRP Configuration Example](#eigrp-configuration-example)
  - [Final Notes](#final-notes)

## Understanding Layer 3 Switching
In traditional Layer 2 switching, the switch forwards traffic based on MAC addresses and cannot route between different IP subnets. A Layer 3 switch (or multilayer switch) combines the functionality of a switch and a router in one device. This means it can perform normal switching within the same VLAN, and it can route between different VLANs or subnets without needing an external router. In practice, a Layer 3 switch allows inter-VLAN routing by using switched virtual interfaces (SVIs) as gateway interfaces for each VLAN, and it can also have routed ports (physical interfaces that act like router interfaces rather than switch ports). Enabling IP routing on a capable Cisco switch (using the ip routing command) turns on its routing functionality so it will use an IP routing table to forward packets between subnets (i.e., between VLANs). This effectively lets the Layer 3 switch perform high-speed routing (often at wire speed) between locally connected networks, eliminating the bottleneck of having a separate router for inter-VLAN traffic. 

**Use case:** In an enterprise network, a Layer 3 switch at the distribution layer can route traffic between multiple VLANs. Each VLAN is a separate IP subnet and broadcast domain; the Layer 3 switch’s SVIs (one per VLAN) serve as default gateways for hosts in those VLANs. The switch can also run dynamic routing protocols to share routes with other Layer 3 devices, which is what we will configure with OSPF and EIGRP in the example scenario.

## Overview of OSPF (Open Shortest Path First)
**Open Shortest Path First (OSPF)** is a link-state dynamic routing protocol used within an autonomous system (interior gateway protocol). It uses the Shortest Path First algorithm (Dijkstra's algorithm) to compute the best routes. All routers running OSPF within the same area share link-state information and build a synchronized link-state database describing the network topology. Each OSPF router independently calculates the shortest path to each network based on this topology information. OSPF is designed to scale to large and complex networks: it supports hierarchical routing by dividing the network into areas (with a backbone area 0 connecting them), which limits the scope of route calculations and update traffic. 

OSPF routers establish adjacencies with neighbors on common networks by exchanging _Hello_ packets and then share _link-state advertisements (LSAs)_ to synchronize their route information. Key features of OSPF include fast convergence on topology changes, support for variable-length subnet masks (VLSM), and equal-cost multi-path routing. **OSPF is an open standard protocol**, meaning it’s not tied to a single vendor and allows interoperability in multi-vendor environments. On Cisco devices, OSPF’s administrative distance (the priority of the source of routing information) is 110 by default, and OSPF uses cost (based on interface bandwidth) as its routing metric. 

In summary, OSPF is well-suited for larger enterprise networks due to its efficient handling of routing information (using areas to compartmentalize the network) and faster convergence compared to older distance-vector protocols. It does require more memory and CPU to maintain the link-state database and run SPF calculations, but the benefit is a precise and loop-free view of the network routes.

## Overview of EIGRP (Enhanced Interior Gateway Routing Protocol)
**Enhanced Interior Gateway Routing Protocol (EIGRP)** is a dynamic routing protocol developed by Cisco. EIGRP is often described as an advanced distance-vector or hybrid routing protocol, because it combines aspects of both distance-vector and link-state approaches. Like a distance-vector protocol, EIGRP routers share route information with directly connected neighbors. However, EIGRP also maintains a detailed topology table and uses the *DUAL (Diffusing Update Algorithm)* to achieve rapid convergence and loop-free operation. This algorithm allows EIGRP to find alternative paths without routing loops and converge quickly after a topology change, which is one of EIGRP’s major advantages. 

Originally, EIGRP was a Cisco-proprietary enhancement of the older IGRP protocol, but it has since been released as an open standard (defined in RFC 7868) and can be implemented on non-Cisco devices as well. EIGRP uses a composite metric that by default considers bandwidth and delay of the links (and can optionally include reliability, load, and MTU). EIGRP supports VLSM, route summarization, and equal and unequal-cost load balancing. It does not use the concept of areas like OSPF; instead, all EIGRP routers with the same autonomous system (AS) number form a single EIGRP domain and exchange routes. (For scalability, EIGRP has the notion of route summarization and stub routers to limit query scope, but it’s flat in terms of areas.) On Cisco devices, internal EIGRP routes have an administrative distance of 90 (making them preferred over OSPF routes by default if a router is running both). 

> By default, EIGRP also used to perform automatic route summarization at classful network boundaries, but this can be disabled with the no auto-summary command for modern networks that use discontiguous subnets or classless addressing (and in modern IOS versions, auto-summarization is off by default). 

In practice, enabling EIGRP on Cisco routers/switches is straightforward: you specify a router process with an AS number and list the networks (with wildcard masks) to include in EIGRP. The protocol will then dynamically discover neighbors on those networks and exchange routing information. EIGRP is known for its fast convergence and efficient bandwidth usage (sending incremental updates only when changes occur, rather than periodic full updates).

## Network Scenario for Configuration
To illustrate OSPF and EIGRP configuration on Layer 3 switches, consider the following network scenario with two Cisco Catalyst Layer 3 switches:

1. Switch1 – acting as a Layer 3 switch for two VLANs and an uplink:
  - VLAN 10 network: 192.168.10.0/24 (SVI interface VLAN 10 has IP 192.168.10.1 as the default gateway for that subnet)
  - VLAN 20 network: 192.168.20.0/24 (SVI interface VLAN 20 has IP 192.168.20.1)
  - Uplink to Switch2: interface GigabitEthernet0/1 is used as a routed port with IP 10.1.1.2/30
2. Switch2 – another Layer 3 switch with its own local VLANs:
  - VLAN 10 network: 192.178.10.0/24 (SVI VLAN 10 IP 192.178.10.1)
  - VLAN 20 network: 192.178.20.0/24 (SVI VLAN 20 IP 192.178.20.1)
  - Uplink to Switch1: interface GigabitEthernet0/1 as a routed port with IP 10.1.1.3/30

Each switch will perform **inter-VLAN** routing for its local subnets (VLAN 10 and 20 on each). The two switches are connected via a point-to-point link (the 10.1.1.2/30 – 10.1.1.3/30 network). We need to configure a dynamic routing protocol (OSPF or EIGRP) between the switches so that Switch1 learns about Switch2’s networks (192.178.10.0/24 and 192.178.20.0/24), and Switch2 learns about Switch1’s networks (192.168.10.0/24 and 192.168.20.0/24). This will allow full IP connectivity between any devices across the two switches’ VLANs. We will walk through enabling Layer 3 routing on the switches and then setting up OSPF and EIGRP separately.

> Note: Before configuring dynamic routing, ensure the Layer 3 switch basics are in place: the VLAN interfaces (SVIs) are created with the correct IP addresses, VLANs exist in the VLAN database, and the physical uplink interfaces are configured as routed ports. Also, make sure `ip routing` is enabled on each switch (this is off by default on some switches and must be turned on to allow routing between SVIs).

### OSPF Configuration Example
We will first configure OSPF on both switches (in a single OSPF area 0) so they can exchange routes. Below are the steps and sample CLI configuration for each switch. Steps to configure OSPF on the Layer 3 switches:

1. **Enable IP routing on the switch:** Enter global configuration mode and enable routing with the ip routing command. This allows the switch to forward packets between VLANs and to participate in routing protocols.

  ```
  Switch1(config)# ip routing
  Switch2(config)# ip routing
  ```

2. **Create and configure SVIs for VLANs:** Ensure VLAN 10 and VLAN 20 are created, then configure interface VLAN 10 and VLAN 20 on each switch with the IP addresses given. These will be the default gateways for devices in those subnets.
  For Switch 1:
  ```
    Switch1(config)# vlan 10
    Switch1(config-vlan)# exit       ! (Optionally give it a name with 'name VLAN10')
    Switch1(config)# vlan 20
    Switch1(config-vlan)# exit       ! (Create VLANs if not already present)
    Switch1(config)# interface vlan 10
    Switch1(config-if)# ip address 192.168.10.1 255.255.255.0
    Switch1(config-if)# no shutdown
    Switch1(config-if)# interface vlan 20
    Switch1(config-if)# ip address 192.168.20.1 255.255.255.0
    Switch1(config-if)# no shutdown
  ```

  For Switch 2: (similarly configure SVIs with its subnet addresses)
  ```
    Switch2(config)# vlan 10
    Switch2(config)# vlan 20
    Switch2(config)# interface vlan 10
    Switch2(config-if)# ip address 192.178.10.1 255.255.255.0
    Switch2(config-if)# no shutdown
    Switch2(config-if)# interface vlan 20
    Switch2(config-if)# ip address 192.178.20.1 255.255.255.0
    Switch2(config-if)# no shutdown
  ```

  After this, each switch has two active SVIs (Vlan10 and Vlan20) acting as gateways for the 192.168.x.0/24 networks on Switch1 and 192.178.x.0/24 networks on Switch2.

3. **Configure the inter-switch link as a routed interface:** On each switch, put the connecting port (GigabitEthernet0/1) into Layer 3 mode with no switchport, then assign the IP address and bring it up.

  For Switch 1:
  ```
    Switch1(config)# interface GigabitEthernet0/1
    Switch1(config-if)# no switchport
    Switch1(config-if)# ip address 10.1.1.2 255.255.255.252
    Switch1(config-if)# no shutdown
  ```

  For Switch 2:
  ```
    Switch2(config)# interface GigabitEthernet0/1
    Switch2(config-if)# no switchport
    Switch2(config-if)# ip address 10.1.1.3 255.255.255.252
    Switch2(config-if)# no shutdown
  ```

  This creates a point-to-point IP link between Switch1 and Switch2 (network 10.1.1.0/30). Once both sides are up, you should be able to ping 10.1.1.3 from Switch1 and 10.1.1.2 from Switch2.

4. **Enable OSPF routing and advertise networks:** Choose an OSPF process ID (it can be any number, locally significant – we'll use 1 for simplicity) and enable OSPF on each switch. Within OSPF, advertise the connected networks so that OSPF will form adjacencies on the link and announce the VLAN subnets. All OSPF routers need to agree on certain parameters to become neighbors; in our simple case we’ll put all networks in OSPF area 0 (the backbone area).
  For Switch 1 (OSPF):
  ```
    Switch1(config)# router ospf 1
    Switch1(config-router)# router-id 1.1.1.1        ! (optional, set an explicit OSPF router ID)
    Switch1(config-router)# network 192.168.10.0 0.0.0.255 area 0
    Switch1(config-router)# network 192.168.20.0 0.0.0.255 area 0
    Switch1(config-router)# network 10.1.1.0 0.0.0.3 area 0
  ```

  For Switch 2 (OSPF):
  ```
    Switch2(config)# router ospf 1
    Switch2(config-router)# router-id 2.2.2.2        ! (optional unique router ID)
    Switch2(config-router)# network 192.178.10.0 0.0.0.255 area 0
    Switch2(config-router)# network 192.178.20.0 0.0.0.255 area 0
    Switch2(config-router)# network 10.1.1.0 0.0.0.3 area 0
  ```
  Each network statement tells OSPF which interface IPs to include in the OSPF process. For example, network 192.168.10.0 0.0.0.255 area 0 will match the Switch1 VLAN10 interface (192.168.10.1) and include that network in OSPF. The statement network 10.1.1.0 0.0.0.3 area 0 covers the 10.1.1.0/30 link interface on each switch – this is crucial because it is the network over which the two OSPF neighbors will form adjacency and exchange routes. We put that in area 0 on both sides, so OSPF will form a neighbor relationship across the link.

  > Note: The wildcard mask 0.0.0.3 corresponds to the /30 subnet mask (255.255.255.252) – it tells OSPF to match interfaces in the 10.1.1.0/30 network. You could also be more specific by using the exact interface IP with a 0.0.0.0 wildcard (e.g., network 10.1.1.2 0.0.0.0 area 0 on Switch1 and network 10.1.1.3 0.0.0.0 area 0 on Switch2), but using the subnet wildcard is common and covers both ends in one statement.

After completing the above, OSPF should establish a neighborship between Switch1 and Switch2 over the Gig0/1 link (area 0). You can verify this with the show ip ospf neighbor command on each switch – you should see the other switch listed as a neighbor with state FULL. Each switch’s routing table (show ip route) will now include OSPF-learned routes to the other switch’s VLAN networks. For example, on Switch1 you should see routes for 192.178.10.0/24 and 192.178.20.0/24 marked with an "O" (OSPF) label, and vice versa on Switch2 for the 192.168.10.0/24 and 192.168.20.0/24 networks. At this point, hosts in VLAN 10 or 20 on Switch1 will be able to reach hosts in VLAN 10 or 20 on Switch2 through the routed link, with OSPF dynamically handling any path changes if the network grows or the link fails.

### EIGRP Configuration Example
Next, we configure EIGRP on the same network as an alternative to OSPF. We will use EIGRP to achieve the same goal: sharing routes between Switch1 and Switch2 so each knows about the other’s VLANs. Ensure that any previous routing process (like OSPF) is turned off or using different interface instances, to avoid confusion; for clarity, this example assumes we are configuring from scratch or after removing OSPF (since we will use EIGRP by itself here). Steps to configure EIGRP on the Layer 3 switches:

1. **Enable IP routing (if not already enabled):** Just as before, use ip routing in global config on each switch to ensure Layer 3 routing is active.

2. **SVIs and routed port setup:** Configure the VLAN interfaces (SVIs) and the Gig0/1 routed link with the same IP addresses as in the OSPF example (steps 2 and 3 above). The network topology and IP addressing remain the same; we are only changing the routing protocol. If you already did this for the OSPF setup, those interface configurations remain and can be reused for EIGRP.

3. **Enable EIGRP and advertise networks:** Decide on an EIGRP autonomous system number to use. It must be the same on both switches to form a neighbor relationship. (In our example we’ll use AS number 1 on both.) Go into EIGRP routing configuration mode and advertise the connected networks. It’s also recommended to disable auto-summarization for clarity in a discontiguous network scenario like this.

  Commands for Switch1 (EIGRP):
  ```
    Switch1(config)# router eigrp 1
    Switch1(config-router)# no auto-summary
    Switch1(config-router)# network 192.168.10.0 0.0.0.255
    Switch1(config-router)# network 192.168.20.0 0.0.0.255
    Switch1(config-router)# network 10.1.1.0 0.0.0.3
  ```
  Commands for Switch2 (EIGRP):
  ```
    Switch2(config)# router eigrp 1
    Switch2(config-router)# no auto-summary
    Switch2(config-router)# network 192.178.10.0 0.0.0.255
    Switch2(config-router)# network 192.178.20.0 0.0.0.255
    Switch2(config-router)# network 10.1.1.0 0.0.0.3
  ```
  These network statements instruct EIGRP to operate on the VLAN interfaces and the inter-switch link interface. Once configured, EIGRP will send out multicast hello packets (to 224.0.0.10) on those interfaces to discover neighbors. Switch1 and Switch2, having the same AS number (1) and connected on the 10.1.1.0/30 link, will discover each other as EIGRP neighbors. They will establish a neighbor adjacency and then exchange their route information (the 192.168.x.x and 192.178.x.x networks) using EIGRP’s reliable update mechanism. Cisco notes that with EIGRP’s default settings, a basic configuration like this (AS number and network statements) is enough to form a fully functional EIGRP routing process. 
  
  > *Explanation:* We used the wildcard masks 0.0.0.255 for the /24 networks and 0.0.0.3 for the /30 link, similar to OSPF. The no auto-summary command is included to ensure EIGRP does not summarize the routes at the classful boundary (for instance, without no auto-summary, EIGRP might try to summarize 192.168.10.0/24 and 192.168.20.0/24 into 192.168.0.0/16 if it thought the network was classful and there were discontiguous classful networks present). Modern IOS versions have auto-summary off by default, but it’s good practice to specify it for clarity. Also, note that EIGRP will automatically calculate metrics for each route based on interface bandwidth and delay; we did not need to manually set any metrics in this simple setup.


After the EIGRP configuration, verify the adjacency with show ip eigrp neighbors on each switch – you should see the other switch’s 10.1.1.x address as a neighbor. The routing table (`show ip route`) will show the learned networks with an initial letter D (which stands for DUAL, indicating EIGRP) for EIGRP-derived routes. For example, on Switch1 you’ll see `D 192.178.10.0/24 [90/...] via 10.1.1.3` and `D 192.178.20.0/24 via 10.1.1.3`. On Switch2, you’ll see `D 192.168.10.0/24 via 10.1.1.2` and `D 192.168.20.0/24 via 10.1.1.2`. The [90/x] in the routing table indicates the EIGRP administrative distance (90 for internal routes) and the EIGRP metric for that route. At this point, connectivity between all VLANs on the two switches should be established via EIGRP. EIGRP will quickly converge if the link goes down or if new networks are added, thanks to its DUAL algorithm ensuring loop-free, rapid updates.

## Final Notes
Both OSPF and EIGRP will accomplish the task of sharing routes between the two Layer 3 switches, but they operate differently. OSPF is open-standard and often preferred in multi-vendor environments or larger, hierarchically designed networks with many sub-areas. EIGRP, while Cisco-centric, is very efficient in simpler Cisco-only environments and is easier to configure (no concept of areas and generally less planning required). In this small scenario, either protocol would work well. The configuration examples above illustrated each protocol independently, but in practice you would choose one routing protocol based on your network design requirements. Always remember to test reachability (using ping or traceroute) between VLANs across the switches and use show commands to verify that neighbors are up and routes are being learned as expected. Lastly, ensure IP routing is enabled on your Layer 3 switches and that there are no access control lists or distribution layer policies blocking the routing protocol traffic (OSPF uses IP protocol 89, EIGRP uses IP protocol 88). With the configurations provided, you should have a functional inter-switch routing setup with OSPF or EIGRP. Good luck with your network configuration!