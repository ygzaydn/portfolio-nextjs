# Cisco CLI Usage on Layer 3 Switches

## Introduction

Cisco’s Command Line Interface (CLI) is the text-based console for configuring and managing Cisco network devices. It provides network engineers with direct, granular control over device settings using a structured command hierarchy. On Cisco switches and routers, the CLI is accessible via a console connection, Telnet, or SSH, and it presents a prompt where users enter commands to monitor or modify the device. For example, a new switch might greet you with a `Switch>` prompt, indicating it’s ready to receive CLI commands.

A **Layer 3 switch** (also known as a **multilayer switch**) is a network switch with built-in routing capabilities. In simple terms, it performs both switching (Layer 2 forwarding) and routing (Layer 3 forwarding) functions.. This means a Layer 3 switch can connect devices on the same VLAN or subnet at high switching speeds _and_ route between different VLANs or subnets like a router. Layer 3 switches often support routing protocols and maintain IP routing tables, but they typically lack WAN interface support found in dedicated routers. They are used to improve performance in LAN environments by enabling inter-VLAN routing and reducing the need for separate router hardware for internal traffic. In summary: a Layer 3 switch is essentially a high-performance switch that can also act as a router for local networks.

- [Cisco CLI Usage on Layer 3 Switches](#cisco-cli-usage-on-layer-3-switches)
- [Cisco CLI Usage on Layer 3 Switches](#cisco-cli-usage-on-layer-3-switches)
- [Introduction](#introduction)
- [Cisco IOS Command Modes](#cisco-ios-command-modes)
- [Ports, Interfaces, and VLANs on a Layer 3 Switch](#ports-interfaces-and-vlans-on-a-layer-3-switch)
  - [Ports and Interfaces](#ports-and-interfaces)
  - [Understanding VLANs (Virtual LANs)](#understanding-vlans-virtual-lans)
  - [Trunking and Trunk Ports](#trunking-and-trunk-ports)
  - [Switched Virtual Interfaces (SVIs)](#switched-virtual-interfaces-svis)
- [Switchport vs. Routed Port: Differences and Roles](#switchport-vs-routed-port-differences-and-roles)
- [Routing Concepts on a Layer 3 Switch](#routing-concepts-on-a-layer-3-switch)
- [Configuration Examples](#configuration-examples)
  - [1. Creating VLANs and Assigning Access Ports](#1-creating-vlans-and-assigning-access-ports)
  - [2. Configuring a Trunk Port](#2-configuring-a-trunk-port)
  - [3. Enabling IP Routing (Layer 3 Switching)](#3-enabling-ip-routing-layer-3-switching)
  - [4. Creating SVIs for Inter-VLAN Routing](#4-creating-svis-for-inter-vlan-routing)
  - [5. Configuring a Routed Port and Static Route (Default Route)](#5-configuring-a-routed-port-and-static-route-default-route)
  - [6. Access Port vs Trunk Port – Configuration Summary](#6-access-port-vs-trunk-port-configuration-summary)
- [Common Troubleshooting Commands and Practices](#common-troubleshooting-commands-and-practices)

## Cisco IOS Command Modes

Cisco’s IOS (Internetwork Operating System) uses a hierarchy of _command modes_, each with a different purpose and level of privilege. Knowing which mode you are in (as indicated by the prompt) and how to navigate between modes is fundamental to using the CLI. The major CLI modes are:

- **User EXEC mode:** This is the initial mode after connecting to the device. The prompt ends with a `>` (e.g. `Switch>`). User EXEC mode provides limited read-only access—allowing basic commands to **view** status (like `ping` or simple `show` commands) but not to change configuration. It’s often used for basic troubleshooting or to verify connectivity. You cannot make configuration changes in this mode.
- **Privileged EXEC mode (Enable mode):** This is an elevated mode that grants full access to view _and_ control the device. The prompt ends with a `#` (e.g. `Switch#`). You enter this mode by typing `enable` at the `>` prompt (and providing a password if configured). In privileged mode, you can view detailed status (`show` commands for configuration, interfaces, logs, etc.) and also enter configuration modes. Think of this as “admin” mode – it’s required for any configuration changes. _(To exit privileged mode and go back to user mode, use the `disable` command.)_
- **Global Configuration mode:** This mode is where you can make changes to the running configuration of the device. You enter global config from privileged mode by typing `configure terminal` (often abbreviated `conf t`). The prompt changes to `Switch(config)#`. In global config, you can configure global settings and also enter more specific sub-configuration modes. For example, you can create VLANs, enable routing, set device-wide parameters, or enter interface configuration from here. Global config commands apply to the device as a whole or prepare you to configure specific features.
- **Interface Configuration mode:** This is a common _sub-mode_ of global configuration used to configure specific interfaces (ports or VLAN interfaces). When in global config, you enter interface mode by typing `interface <interface-id>`, such as `interface GigabitEthernet1/0/1`. The prompt becomes `Switch(config-if)#`, indicating you can now set options for that interface. Interface configuration mode is used for actions like assigning VLANs to a port, setting IP addresses on an interface, or enabling/disabling an interface. Each interface (physical port or logical interface) has its own configuration. There are other sub-configuration modes as well (for example, `router` configuration mode for routing protocols, `line` configuration mode for console/VTY settings, etc.), but interface config is one of the most frequently used on switches.

**Navigating between modes:** From user EXEC (`>`), use the `enable` command to enter privileged EXEC (`#`). From privileged EXEC, `configure terminal` takes you into global config mode (`(config)#`). To go into interface config, use the `interface` command as described. To exit _interface config_ and return to global config, type `exit`. To exit global config and return to privileged EXEC, type `exit` again or use the shortcut `end` or press **Ctrl+Z**. These navigation commands are summarized here:

- `enable` – Enter privileged EXEC mode (from user mode).
- `configure terminal` – Enter global config mode (from privileged mode).
- `interface <id>` – Enter interface config mode (from global config).
- `exit` – Exit the current sub-mode (e.g. from interface config back to global, or from global back to privileged).
- `end` or _Ctrl+Z_ – Exit configuration mode completely and return to privileged EXEC.

A useful tip for beginners is that you can use `?` at any prompt to see available commands. For instance, at a `Switch#` prompt, typing `?` will list all commands available in privileged mode, and at `Switch(config)#`, `?` will list commands available in global config. Cisco CLI also supports auto-completion of commands (you can type the first few unique letters and press Tab) and remembers command history (use the up/down arrow keys to scroll through previous commands).

## Ports, Interfaces, and VLANs on a Layer 3 Switch

Before diving into configuration, it’s important to understand some fundamental elements: **ports vs. interfaces**, **VLANs**, **trunking**, and **SVIs**. These concepts define how a Layer 3 switch connects and segments networks.

### Ports and Interfaces

In Cisco terminology, the terms “port” and “interface” are closely related. A **port** usually refers to a physical Ethernet port on the switch (the actual hardware connector), while an **interface** in the CLI can refer to either a physical port or a logical interface. Each switch port has an corresponding interface in the CLI command structure.

On a Layer 3 switch, physical ports can operate in one of two modes:

- **Layer 2 mode (Switchport):** In this default mode, a port is a switching port – it belongs to a VLAN and does not have an IP address assigned to it. It simply forwards Ethernet frames, using MAC addresses to switch within the VLAN. These are often called **switchports**. Switchports can be configured as access ports or trunk ports (explained below).
- **Layer 3 mode (Routed port):** In this mode, a port behaves like a router interface. Instead of switching frames, it routes IP packets. You assign an IP address directly to the interface, and it no longer belongs to any VLAN. In Cisco IOS, you convert a switchport to a routed port by using the `no switchport` command on that interface). After that, you can use `ip address X.X.X.X <mask>` to give it an IP, just as you would on a router interface. Routed ports are typically used for point-to-point links connecting to other Layer 3 devices (like linking a switch to a router or to another Layer 3 switch for routing between networks).

Every physical interface on a Catalyst Layer 3 switch is a switchport by default (Layer 2). You only use `no switchport` on interfaces when you need Layer 3 routing on that link. Most user devices (PCs, printers, etc.) and access point connections use Layer 2 access ports. Routed ports are commonly used when connecting to routers or when building a routed topology between distribution/core switches where you don’t need VLANs spanning those links.

It’s also worth noting that the Cisco CLI refers to interfaces by names like `FastEthernet0/1`, `GigabitEthernet1/0/24`, etc., depending on the model and speed. “Interface” is the keyword used in configuration. For example, `interface GigabitEthernet1/0/1` corresponds to the first Gigabit port.

Lastly, Layer 3 switches have special logical interfaces called VLAN interfaces or SVIs (covered below) which are _not_ physical ports but are treated as interfaces in the CLI for routing purposes. There is also a **management interface (VLAN 1)** by default which can be assigned an IP for switch management if the switch is not routing.

### Understanding VLANs (Virtual LANs)

A **VLAN (Virtual Local Area Network)** is a logical subdivision of a switch (or network) that groups ports into separate broadcast domains. By creating VLANs, you can partition a single physical switch into multiple virtual switches; devices on different VLANs cannot directly communicate with each other without a router (or Layer 3 capability) connecting them. VLANs are identified by a number (VLAN ID) and can span multiple switches (if those switches have a trunk link carrying the VLAN).

VLANs offer improved network management, security, and scalability. For example, you might put the computers in the Engineering department on VLAN 10 and Finance on VLAN 20 to isolate their traffic. Within each VLAN, broadcasts and unknown traffic are confined, reducing unnecessary load on other parts of the network. VLANs also allow grouping of users by function or location _virtually_ – hosts can be in the same VLAN even if connected to different physical switches (as long as the switches are connected via trunk links). This provides flexibility to logically organize the network without re-cabling.

By default, Cisco switches have **VLAN 1** as the native, untagged VLAN, and all ports are in VLAN 1 unless moved to another VLAN. VLAN 1 is the default management VLAN as well. It’s common to create additional VLANs (IDs 2–4094 are usable, with 1 and 1002-1005 reserved in Cisco IOS) for separating traffic types (e.g., data, voice, guest networks).

**Creating and using a VLAN:** To create a new VLAN in the Cisco CLI, you use global configuration commands. For example, to create VLAN 10 and give it a name:

```bash
  Switch# configure terminal
  Switch(config)# vlan 10
  Switch(config-vlan)# name Engineering
  Switch(config-vlan)# exit
```

Once VLANs are created on the switch, you can assign switch ports to those VLANs. Assigning a port to a VLAN makes it an **access port** for that VLAN (meaning it will carry traffic for only that VLAN, appropriate for end devices). We will cover the specific commands in the configuration examples, but conceptually: if you assign port FastEthernet0/1 to VLAN 10, any device plugged into Fa0/1 will be in VLAN 10’s broadcast domain. Devices in VLAN 10 can only talk directly to other devices in VLAN 10 (or through an L3 device for routing to other VLANs).

VLAN configuration changes (creating VLANs, naming them, assigning ports) are **local to each switch**. If you have multiple switches, you need to ensure VLANs exist on each switch where they are used. Protocols like VTP (VLAN Trunking Protocol) can propagate VLAN info, but that’s beyond the scope of this introduction – here we assume you configure VLANs manually on each switch as needed.

### Trunking and Trunk Ports

If VLANs span multiple switches, there needs to be a way for VLAN traffic to travel from one switch to another. This is where **trunking** comes in. A **trunk port** is a switch port configured to carry traffic for multiple VLANs over a single link between switches (or between a switch and a router in certain configurations). Trunking works by tagging Ethernet frames with a VLAN identifier (using the IEEE 802.1Q tagging standard) so that the receiving switch knows which VLAN each frame belongs to.

- An **access port** carries traffic for only one VLAN. Frames on access ports are not tagged; the switch associates the port with a specific VLAN, and any device connected doesn’t need to know about VLAN tags. Access ports are typically used to connect end devices (which are unaware of VLAN tagging).
- A **trunk port** can carry traffic for multiple VLANs simultaneously. On a trunk, frames are expected to have 802.1Q tags indicating their VLAN (except frames belonging to the _native VLAN_, which are untagged by convention). Trunk ports are used for inter-switch links or connections to other network devices that understand VLAN tags (e.g., a router-on-a-stick configuration or a server with a VLAN-aware NIC). Trunking allows VLANs to be extended across the network. For instance, VLAN 10 on Switch A and VLAN 10 on Switch B can communicate through a trunk link between the switches that carries VLAN 10’s traffic (tagged) across.

By default on many Cisco switch models, an interface is in dynamic desirable trunking mode or simply an access port on VLAN 1. On newer switches (and Cisco’s small-business models), often all ports might default to an access mode or a trunk mode – but best practice is to explicitly configure your ports as access or trunk as needed. A port in **trunk mode** will, by default, allow all VLANs across it. You can restrict which VLANs are allowed on a trunk with the `switchport trunk allowed vlan` command if you want to limit that for security or network design reasons (for example, only allow VLANs 10,20,30 on a given trunk).

To configure a trunk port on a Cisco switch, you typically do the following in interface configuration:

```bash
Switch(config)# interface GigabitEthernet1/0/24
Switch(config-if)# switchport mode trunk
```

On some platforms, you may need to specify the trunk encapsulation (`switchport trunk encapsulation dot1q`) _before_ setting mode trunk. This is required on older Catalyst switches that supported both ISL and 802.1Q. Many modern switches only support 802.1Q, so they default to it and do not accept an encapsulation command. In our examples, we’ll assume 802.1Q trunking (the standard VLAN tagging method).

**Native VLAN:** One VLAN on a trunk can be untagged, known as the native VLAN (by default this is VLAN 1). Traffic on the native VLAN is sent without tags. Typically, the native VLAN is just left as VLAN 1 or another designated VLAN and must match on both ends of the trunk. For a beginner’s guide, it’s enough to be aware that the native VLAN exists; it’s often left as the default or set to an unused VLAN for security. All other VLANs going over the trunk are tagged.

**Trunk vs Access summary:** An access port is for end devices and carries a single VLAN (untagged). A trunk port is for device-to-device links and can carry multiple VLANs (tagged). If you plug a normal PC into a trunk port, it won’t understand the tags and communication will fail. So ensure end hosts go into access ports, and trunks are only between network devices. In the configuration section, we’ll show examples of setting up both access and trunk ports.

### Switched Virtual Interfaces (SVIs)

A **Switched Virtual Interface (SVI)** is a logical Layer 3 interface corresponding to a VLAN on the switch. It’s sometimes called a VLAN interface. An SVI acts as the _routing interface_ for traffic on that VLAN, essentially providing a default gateway for devices in the VLAN, but implemented on the switch itself. When a Layer 3 switch performs inter-VLAN routing, it does so by using SVIs.

For example, if you have VLAN 10 for Engineering and VLAN 20 for Finance, you could create `interface Vlan10` and `interface Vlan20` on the switch, and assign IP addresses to each (say 192.168.10.1/24 and 192.168.20.1/24 respectively). These IPs would serve as the default gateways for hosts in VLAN 10 and VLAN 20. The switch, having both interfaces, can then route packets between the two VLANs internally. This is **inter-VLAN routing** without needing an external router – the Layer 3 switch is doing the routing. In effect, the SVI **connects the VLAN (Layer 2 domain) to the switch’s Layer 3 routing engine**.

Key points about SVIs:

- There is at most one SVI per VLAN. You don’t _have to_ create an SVI for every VLAN – you only create it if you want that VLAN to be routed or to manage the switch on that VLAN. VLANs can exist purely for Layer 2 separation with no Layer 3 interface, if desired.
- When you create an SVI with `interface vlan <vlan-id>` and assign an IP, the switch will have a _connected route_ in its IP routing table for that subnet (once the SVI is up). For hosts in that VLAN, the SVI’s IP is typically the default gateway.
- SVIs are only functional if the VLAN exists on the switch and is active (i.e., there is at least one up/up port in that VLAN, or the SVI is administratively up and the switch has `ip routing` enabled). You may need to issue `no shutdown` in the SVI interface config to activate it, just like a router interface.
- By default, Cisco switches have an SVI for VLAN 1 created (often used for management). Additional SVIs can be created as needed. Each uses one IP from the VLAN’s subnet, so plan your IP addressing accordingly (don’t assign the same IP on another device like a router).

SVIs essentially give the Layer 3 switch a foot in both the Layer 2 and Layer 3 worlds: the VLAN is the Layer 2 segment, and the SVI is a Layer 3 interface that routes between VLANs on the switch. This is far more efficient than the older “router-on-a-stick” approach (where a single router interface with subinterfaces did VLAN routing through an external router), because the routing is done in hardware on the switch’s ASICs, yielding **much faster inter-VLAN routing performance**.

To use SVIs for routing, you must ensure the switch’s routing function is enabled (more on that soon). On some switches, inter-VLAN routing is automatically enabled when you create SVIs; on others, you need to turn on IP routing explicitly. We will demonstrate SVI configuration in the examples section.

## Switchport vs. Routed Port: Differences and Roles

As introduced earlier, a Layer 3 switch can treat its ports either as switchports (Layer 2 interfaces) or routed ports (Layer 3 interfaces). Understanding when to use each is important in network design:

- **Switchports (Layer 2 Access/Trunk Ports):** These are used for building your Layer 2 topology. Access switchports connect to end devices (PCs, printers, IP phones, etc.) or to APs, and they carry a single VLAN’s traffic (untagged). Trunk switchports connect to other switches (or occasionally routers/servers using VLAN tagging) and carry multiple VLANs (tagged). Switchports participate in VLANs and are subject to Layer 2 protocols (like STP – Spanning Tree Protocol – which runs on switchports to prevent loops). They do _not_ have IP addresses (except for special cases like an access port might have an IP phone with voice VLAN, but that’s not an IP on the port itself, just passed through). If a Layer 3 switch port is in switchport mode, any Layer 3 communication involving devices on that port **must go via an SVI or external router** to leave the VLAN.
- **Routed Ports (Layer 3 Interfaces):** These are configured with `no switchport` and act like regular router interfaces. A routed port doesn’t handle switching or VLAN tagging; it’s purely Layer 3. You assign it an IP address and it appears in the switch’s routing table as a directly connected subnet. Routed ports are ideal for point-to-point connections. For instance, if you have a core Layer 3 switch connecting to an upstream router (for internet or WAN), you might use a routed port on the switch connected to a routed interface on the router. Another use-case is connecting two Layer 3 switches together for routing purposes (instead of trunking all VLANs between them, you route between them with a network in between). To reiterate, converting an interface to a routed port is done by entering interface config and typing `no switchport`. After that, you can use the `ip address ...` command on the interface. Internally, the switch no longer associates that port with any VLAN – it’s its own routed interface.

## Routing Concepts on a Layer 3 Switch

One of the main advantages of a Layer 3 switch is that it can perform routing, allowing devices in different VLANs or subnets to communicate. The fundamental routing concepts to understand in this context are **inter-VLAN routing**, **static routing**, and **default routes**.

First, it’s important to know that by default a Catalyst switch might have its routing function turned _off_ (acting purely as a Layer 2 switch). On many Layer 3 switch models, you must enable IP routing to use its Layer 3 capabilities. This is done with the simple command `ip routing` in global configuration. (On some newer platforms or default configurations, IP routing may be on, but it’s good practice to know this command.) If IP routing is not enabled, the switch will not route packets between SVIs or routed ports – it will behave like an ordinary Layer 2 switch except for its single management VLAN interface. So **enabling routing is step one** whenever you want a switch to perform routing. We will include that in our configuration examples.

Now, let’s clarify the routing terms:

- **Inter-VLAN Routing:** This refers to routing between different VLANs. As discussed, hosts in one VLAN cannot reach hosts in another VLAN without a router (or Layer 3 switch) doing the forwarding. On a Layer 3 switch, inter-VLAN routing is achieved by creating SVIs for each VLAN and enabling IP routing. For example, if PC1 is in VLAN 10 and PC2 is in VLAN 20, the Layer 3 switch can route traffic from PC1 to PC2 if it has an SVI with an IP in VLAN 10 and an SVI with an IP in VLAN 20, and IP routing is on. Inter-VLAN routing on a Layer 3 switch is fast and internal – the packet comes in on VLAN 10, goes up to the switch’s routing engine, and goes out via VLAN 20, all within the same device. This is much more efficient than sending it out to an external router and back in (which would be the case on a pure Layer 2 switch). We’ll demonstrate inter-VLAN routing in the config example by setting up two VLANs and their SVIs, then confirming that the switch routes between them.
- **Static Routing:** Static routing is the practice of manually configuring routes in the switch’s routing table. This is typically done to reach networks that are not directly connected (i.e., not on one of the switch’s VLANs or interfaces). For example, if the Layer 3 switch is connected to a router for internet access, you might add a static default route (0.0.0.0/0) pointing to that router. Or if you have two Layer 3 switches connected via a routed link, each might have static routes for the VLANs on the other. Static routes are simple and have no overhead of running a routing protocol, but they do not adapt to network changes unless you reconfigure them. Cisco IOS allows up to many static routes (and some lower-end models might have a limit, e.g., 16 on certain LAN Lite switches, but enterprise models support far more). A static route is configured with the `ip route` command. For instance: `ip route 192.168.50.0 255.255.255.0 192.168.20.254` would tell the switch to send traffic for the 192.168.50.0/24 network to 192.168.20.254 (which might be an upstream router). We will show an example of configuring a static route (specifically a default route) in the upcoming section. Static routes are useful for small or stable networks and are often used in conjunction with SVIs on a Layer 3 switch to connect to a core router. _(Remember: when you add a static route, if the next-hop interface goes down, the static route is removed from the routing table until the interface comes back up.)_
- **Default Route:** A default route is a special static route that matches all traffic that doesn’t have a more specific route in the routing table. In IPv4, it is defined as network `0.0.0.0` mask `0.0.0.0` (sometimes written as `0.0.0.0/0`). This is also called the “gateway of last resort” in Cisco terminology – meaning if the switch doesn’t know how to route a packet, it will send it via this route. On a Layer 3 switch in a LAN, a common default route is to point to your internet gateway router’s IP. For example: `ip route 0.0.0.0 0.0.0.0 10.10.10.1` would send all unknown traffic to 10.10.10.1 (perhaps an internet router). Once this default is set, the switch will forward any traffic destined for outside networks to that router. In our scenario, R1 might be an internet router, so D1 (the L3 switch) would have a default route to R1’s IP. We’ll include that in the example. The concept of default routing is that routers and L3 switches use it to avoid needing explicit routes for every external network – anything not in their table goes to the default next hop.
- **Dynamic Routing:** While not explicitly in the list, you should know that many Layer 3 switches can run dynamic routing protocols (like OSPF, EIGRP, RIP, BGP). Dynamic routing lets devices exchange routes and automatically adjust to network changes. However, not all switch models or software licenses support dynamic routing (some Layer 3 switches in “IP Base” license support OSPF/EIGRP, others in “LAN Base” might only do static routing). For a beginner guide, we won’t configure dynamic routing here. Just be aware it exists; in larger networks, dynamic routing is often running on the core/distribution switches. If your switch supports it and you need it, you’d go into (for example) `router ospf` configuration mode and so on. But if not, static routes (or default routes) will do the job for simpler networks.

In practice, inter-VLAN routing on a Layer 3 switch is often combined with static or dynamic routing to handle traffic beyond the local VLANs. For instance, once the switch routes between VLAN 10 and 20, if either VLAN needs internet, the switch still needs a route to the internet router. That could be a static default route as mentioned. Conversely, the router might have a static route back to the VLAN subnets via the switch’s IP.

To recap this section: On a Layer 3 switch, enable **`ip routing`** to turn on routing. Use **SVIs** to handle inter-VLAN routing (routing _within_ the switch for local VLANs). Use **static routes** (especially a **default route**) to send traffic to external networks (like to a router for non-local destinations). The next section will provide concrete examples of configuring these elements step-by-step.

## Configuration Examples

Let’s put the theory into practice with a series of configuration examples. In this scenario, we’ll configure a Layer 3 switch with two VLANs (10 and 20), assign ports to those VLANs (access ports), set up a trunk port, enable IP routing, create SVIs for inter-VLAN routing, and add a static route (default route) for external connectivity. Along the way, we will contrast access vs trunk port configurations. Each step will include the CLI commands you would use and a brief explanation.

> **Assumed Starting Point:** The switch is at factory defaults (all ports in VLAN 1, no extra VLANs, no IP routing enabled). We are in privileged EXEC mode (`Switch#`). Also, in these examples, `Switch` is the hostname; yours may differ (you can change it with the `hostname` command in global config).

### 1. Creating VLANs and Assigning Access Ports

First, create the VLANs on the switch and assign some ports to them as access ports. We’ll create VLAN 10 and VLAN 20, and assume these correspond to two departments (e.g., Engineering and Finance):

```
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name Engineering    ! (optional: name the VLAN)
Switch(config-vlan)# exit
Switch(config)# vlan 20
Switch(config-vlan)# name Finance
Switch(config-vlan)# exit
```

The above commands define VLAN 10 and 20 in the switch’s VLAN database (with optional names for clarity). Now we’ll assign specific interfaces to those VLANs as access ports. Let’s say ports FastEthernet 0/1 and 0/2 belong to Engineering (VLAN 10), and FastEthernet 0/3 and 0/4 belong to Finance (VLAN 20):

```bash
Switch(config)# interface range FastEthernet0/1 - 2
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit
Switch(config)# interface range FastEthernet0/3 - 4
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
Switch(config-if-range)# exit
```

Let’s break down what we did:

- We used **interface range** to configure multiple ports at once (Fa0/1-2 as a group, then Fa0/3-4). You could also do them one by one with `interface FastEthernet0/1`, etc.
- `switchport mode access` forces the interface into access mode (it will not try to become a trunk). This is good practice to prevent any dynamic trunking negotiation; it ensures the port is an access port.
- `switchport access vlan 10` assigns the port(s) to VLAN 10. (Similarly for VLAN 20 on the other ports.) If those VLANs did not exist, this command would typically **create** them on the fly, but since we already created them, it just assigns membership.

At this point, if you connect devices to Fa0/1 and Fa0/2, they are in VLAN 10 (Engineering), and devices on Fa0/3 and Fa0/4 are in VLAN 20 (Finance). Those in the same VLAN can communicate at Layer 2 (assuming their IP addresses are in the same subnet and so on), but VLAN 10 devices cannot yet talk to VLAN 20 devices – we’ll address that with SVIs and routing.

_Verification:_ You can verify VLAN creation and port assignment with the `show vlan brief` command, which lists all VLANs and their member ports:

```bash
Switch# show vlan brief VLAN Name                             Ports
---- -------------------------------- -------------------------------
1    default                          Fa0/5, Fa0/6, Fa0/7, Fa0/8, ...
10   Engineering                      Fa0/1, Fa0/2
20   Finance                          Fa0/3, Fa0/4
1002 fddi-default                     <other ports...>
... (output truncated) ...
```

In the above (example) output, we see VLAN 10 and 20 exist and which ports are assigned to them. Ports Fa0/5 and onward are still in VLAN 1 (unused in our config).

### 2. Configuring a Trunk Port

Next, suppose this switch (Switch) needs to connect to another switch (or a router that expects VLAN tags). We’ll configure one of the Gigabit ports as a trunk to carry both VLAN 10 and 20. Let’s use GigabitEthernet0/1 for this uplink trunk:

```
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# exit
```

We entered interface config for Gi0/1, set it to trunk mode and then explicitly allowed only VLANs 10 and 20 on this trunk. The `allowed vlan` command is optional – by default, all VLANs would be allowed. However, specifying only the needed VLANs is a security best practice to prevent unnecessary VLAN traffic on the link. In this example, we only need VLANs 10 and 20 to traverse this trunk, so we limited it to those. (VLAN 1 will not be carried in this case, because we restricted the list. If you needed the native VLAN or other VLANs, include them accordingly or omit the command to allow all by default.)

If your switch requires specifying encapsulation (older models where you might see an error without it), you would do `switchport trunk encapsulation dot1q` prior to `switchport mode trunk`. On many current Catalyst switches (e.g., 2960X, 9200), that command is not available and 802.1Q is assumed.

_Verification:_ To verify trunk configuration, two useful commands are:

- `show interfaces trunk` – which displays trunk ports, their allowed VLANs, and VLANs actively passing, etc.
- `show interfaces GigabitEthernet0/1 switchport` – which shows detailed info on the port mode (e.g., it will say “Operational Mode: trunk” and list allowed and native VLANs).

For example:

```
Switch# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         connected     1

Port        Vlans allowed on trunk
Gi0/1       10,20

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/1       10,20
```

This indicates Gi0/1 is a trunk, up and running, with VLANs 10 and 20 allowed (since we limited it) and active. The native VLAN is 1 (default) but we have no devices in VLAN 1 in our scenario, so it’s just there by default. The `show interfaces switchport` command would show “Administrative Mode: trunk” and “Operational Mode: trunk” and confirm the allowed VLAN list as well.

_(For our purposes, we assume the other end of this trunk (e.g., on another switch) is similarly configured as trunk and has VLANs 10 and 20 present. Proper trunk operation requires both sides set to trunk and typically the same native VLAN.)_

### 3. Enabling IP Routing (Layer 3 Switching)

Now we shift to Layer 3 configuration. To route between VLANs on this switch (and generally enable the switch’s routing functionality), we need to enable IP routing. This is a single command in global config:

`Switch(config)# ip routing`

That’s it! With `ip routing` enabled, the device transitions from purely switching to routing mode. This allows the switch to examine IP packets and make routing decisions between its interfaces (SVIs or routed ports). As mentioned, many Catalyst switches have this off by default in some modes, so it’s a critical step for inter-VLAN routing. After enabling this, the switch will automatically install connected routes for any SVIs or routed ports that have IP addresses. If we had SVIs configured already, they would become active in the routing table after this.

_(On some Layer 3 switches running certain IOS versions, `ip routing` might be on by default. There is no harm in issuing the command again – it will just ensure the setting is enabled. If you ever needed to disable routing for some reason, `no ip routing` would turn the switch back into Layer 2 mode except for the management interface.)_

According to Cisco documentation, this command **must** be configured to allow IPv4 inter-VLAN routing on a Layer 3 switch. So we’ve now done that.

### 4. Creating SVIs for Inter-VLAN Routing

With VLANs 10 and 20 existing and IP routing enabled, we can create the Switched Virtual Interfaces (SVIs) to actually route between those VLANs. We’ll assign an IP address to each SVI which will serve as the default gateway for hosts in that VLAN. Let’s use 192.168.10.1/24 for VLAN 10, and 192.168.20.1/24 for VLAN 20 in this example.

```
Switch(config)# interface vlan 10
Switch(config-if)# description Engineering SVI
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown  Switch(config-if)# exit
Switch(config)# interface vlan 20
Switch(config-if)# description Finance SVI
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit
```

We entered interface config for `Vlan10` and `Vlan20`. Assigning the IP addresses is straightforward, just like on a router interface. The `no shutdown` is included to ensure the SVI is not administratively down – on many switches SVIs come up by default when an IP is assigned (and the VLAN has an active port), but it’s good practice to add `no shut` to be sure the interface is enabled. The descriptions are optional but helpful for documentation.

At this point, the switch will have two new Layer 3 interfaces up (assuming VLAN 10 and 20 each have at least one active access port or trunk carrying them; if no ports in a VLAN are up, the SVI might stay down/down). The routing table (`show ip route`) should now show two connected networks:

```
Switch# show ip route
192.168.10.0/24  is directly connected, Vlan10
192.168.20.0/24  is directly connected, Vlan20
```

This confirms the switch knows about those networks and can route between them. Now any PC in VLAN 10 with gateway 192.168.10.1 can reach any PC in VLAN 20 with gateway 192.168.20.1, through the switch. The switch’s job is to route the packet from VLAN 10 interface to VLAN 20 interface internally. This is the core of inter-VLAN routing: each VLAN gets an interface (SVI) on the switch with an IP, and hosts use that IP as their default route.

_Note:_ If you test connectivity (say, ping from a PC in VLAN 10 to a PC in VLAN 20) and it fails, check that:

1.  IP routing is enabled (we did that),
2.  SVIs are up (use `show ip interface brief` to see interface status),
3.  host devices have the correct IP/mask/gateway configured,
4.  any host firewalls are not blocking ping, etc. On the switch itself, you can use `ping` in privileged mode to try pinging the other SVI IP as a test (e.g., `ping 192.168.20.1` from the switch should obviously work since that’s its own interface; pinging a host IP in VLAN 20 from the switch would test connectivity to that host).

### 5. Configuring a Routed Port and Static Route (Default Route)

In our scenario, we have a trunk connecting to another switch carrying VLANs 10 and 20. But what if we want to connect the Layer 3 switch to a router (say for internet access)? We would typically use a routed port for that. For example, let’s use GigabitEthernet0/2 on the switch to connect to an internet router. We’ll make it a routed port and assign it an IP in a new subnet (e.g., 10.0.0.2/30, where 10.0.0.1 is the router):

```
Switch(config)# interface GigabitEthernet0/2
Switch(config-if)# no switchport
Switch(config-if)# ip address 10.0.0.2 255.255.255.252
Switch(config-if)# no shutdown
Switch(config-if)# description Link to Internet Router
Switch(config-if)# exit
```

By doing `no switchport`, the prompt might change to `Switch(config-if)#` (it stays the same prompt, but now the context is L3). We assign the IP and bring it up. Now this switch has an interface 10.0.0.2/30. The router on the other end would be 10.0.0.1/30. They should be able to ping each other at this point (once the router is configured).

However, the hosts in VLAN 10 and 20 don’t yet know about anything beyond their subnets. And the switch doesn’t know about, say, the internet. This is where a **static default route** comes in. We’ll configure a default route on the switch to send unknown traffic to 10.0.0.1 (the router):

`Switch(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.1`

This one-liner tells the switch: for any destination not in my routing table, use 10.0.0.1 as the next hop. Now the switch can reach external networks via the router. We’d also need a reciprocal route on the router for the VLANs (unless the router is doing its own dynamic routing or has a default back to the switch). Typically, you’d put a static route on the router like `ip route 192.168.10.0 255.255.255.0 10.0.0.2` and same for 192.168.20.0/24, _or_ if the router treats 10.0.0.2 as a default for LAN, maybe a default route on router pointing to the switch – depends on scenario.

At this stage, our Layer 3 switch is fully configured to handle internal routing between VLANs 10 and 20, and to forward external-bound traffic to the router. This meets the requirements of most enterprise access/distribution switches.

_(The static route we added is an example of a floating static (a default)). If we had more complex topology with multiple routes, we could add others as needed. The command format also allows specifying an exit interface instead of next-hop IP in some cases, but using the IP is usually clearer on multi-access networks.)_

### 6. Access Port vs Trunk Port – Configuration Summary

Let’s explicitly highlight the difference in configuration between an access port and a trunk port on Cisco IOS, since this is often an area of confusion for those new to the CLI:

- **Access Port Example:** Suppose we want to configure interface FastEthernet0/10 as an access port in VLAN 20. The commands would be:

  ```
  Switch(config)# interface FastEthernet0/10
  Switch(config-if)# switchport mode access
  Switch(config-if)# switchport access vlan 20
  Switch(config-if)# no shutdown
  ```

  This sets Fa0/10 to access mode and places it in VLAN 20. (On many switches, access ports are enabled by default, but doing `no shutdown` ensures it’s not disabled.)

- **Trunk Port Example:** Now compare with interface GigabitEthernet0/5 as a trunk connecting to another switch:

  ```
  Switch(config)# interface GigabitEthernet0/5
  Switch(config-if)# switchport mode trunk
  Switch(config-if)# switchport trunk native vlan 1      ! (native VLAN 1, default)
  Switch(config-if)# switchport trunk allowed vlan 10,20
  Switch(config-if)# no shutdown
  ```

  This sets Gi0/5 as a trunk. We explicitly left native VLAN as 1 (which is default; we showed the command for illustrative purposes) and allowed VLANs 10 and 20. On some platforms, if trunk encapsulation needs to be specified, you’d do that as well here. A trunk port does not use an `access vlan` command – that command only applies to ports in access mode.

To further clarify: if you accidentally set a trunk port to access mode, it will only carry one VLAN. Conversely, if you accidentally set an access port to trunk, it might start tagging frames and cause connectivity issues for the connected device. Always configure ports intentionally and use `show interfaces switchport` to check. That command’s output will clearly say **"Administrative Mode: access/trunk"** and **"Operational Mode: access/trunk"** along with the **Access VLAN** or **Trunking VLANs Allowed**. This is a great way to troubleshoot a port that isn’t behaving as expected.

In summary, the configuration difference is mostly just two commands (`switchport mode access/trunk` and related subcommands). Remember that access ports = one VLAN, untagged; trunk ports = multiple VLANs, tagged. And on Layer 3 switches, if you want a pure routed interface, you remove the switchport mode entirely with `no switchport`.

Having completed all these steps, we have effectively set up a Layer 3 switch. To recap the configuration in a condensed form, here’s what we have on our switch now (simplified):

```
! VLAN definitions
vlan 10
 name Engineering
vlan 20
 name Finance

! Interface configurations
interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10
interface FastEthernet0/2
 switchport mode access
 switchport access vlan 10
interface FastEthernet0/3
 switchport mode access
 switchport access vlan 20
interface FastEthernet0/4
 switchport mode access
 switchport access vlan 20

interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20

interface GigabitEthernet0/2
 no switchport
 ip address 10.0.0.2 255.255.255.252
 no shutdown

! SVIs for inter-VLAN routing
interface Vlan10
 ip address 192.168.10.1 255.255.255.0
 no shutdown
interface Vlan20
 ip address 192.168.20.1 255.255.255.0
 no shutdown

! Enable IP routing
ip routing

! Static default route
ip route 0.0.0.0 0.0.0.0 10.0.0.1
```

The above is a high-level look at what our running configuration includes after performing steps 1–5. In a real scenario, there would be more lines (spanning-tree config, etc.), but we’ve focused on the essentials.

## Common Troubleshooting Commands and Practices

With the configuration in place, managing and troubleshooting a Layer 3 switch involves using various **show** and **diagnostic** commands to verify the status of interfaces, VLANs, and routes. Here are some common commands and tips:

- **Show Interface Status:** Use `show interfaces status` to get a quick overview of all ports: which are connected, what VLAN they’re in, and their speed/duplex. This is a handy snapshot to see if ports are up and assigned correctly. For example, in the output you might see a port with VLAN “routed” which indicates it’s a no switchport (routed) port, versus a port showing a VLAN number or “trunk”. This helps identify which ports are access (it will list the access VLAN) and which are trunks or routed ports.
- **Show Interfaces Switchport:** This command provides detailed info per interface about its administrative/operational mode, access/trunk status, native VLAN, allowed VLANs, etc.. It’s very useful to verify if a port is actually in trunk mode or access mode as intended. If something isn’t communicating, check here to ensure the port is in the right mode and VLAN.
- **Show VLAN / Show VLAN Brief:** As shown earlier, `show vlan brief` lists VLANs and their member ports. If a port is not in the VLAN you expect, this will reveal it. It also shows if VLANs exist on the switch. If a VLAN is missing from this list, any ports tagged with it will be inactive – you may have forgotten to create the VLAN (or it was pruned off a trunk). Always ensure the VLAN is present in `show vlan`. The non-brief `show vlan` gives additional info like VLAN names.
- **Show Interfaces Trunk:** This specifically lists trunk ports, their mode, encapsulation, status, native VLAN, and the VLANs allowed and active on them. It’s the go-to command to troubleshoot VLAN propagation issues across trunks. For instance, if VLAN 20 isn’t reaching another switch, check `show interfaces trunk` on both ends to see if VLAN 20 is allowed and active. If not, you may need to adjust `allowed vlan` settings or ensure the VLAN exists on both switches. Our example `show interfaces trunk` output earlier showed VLANs 10,20 allowed on Gi0/1 and active.
- **Show IP Interface Brief:** This command gives a summary of all Layer 3 interfaces (SVIs and routed ports) with their IP addresses and status (up/down Use it to quickly see if your SVIs are up (they will be up/up if at least one port in that VLAN is up, or if not, they might be down/down – maybe no device is in that VLAN yet). It also shows the routed port’s status. For example, after our config, `show ip interface brief` should show Vlan10 and Vlan20 both up (assuming at least one device is active in each VLAN, or at least the VLAN interface was no shut) with their IPs, and Gigabit0/2 up with 10.0.0.2. If something is down that should be up, investigate cable connections or whether `no shutdown` was missed.
- **Show IP Route:** This shows the routing table of the switch. You should see connected routes for your SVIs and routed port, and the static route(s) you configured. For instance, it might show `C 192.168.10.0/24 is directly connected, Vlan10` and similar for VLAN20, plus a static 0.0.0.0/0 pointing to 10.0.0.1 (with an S for static). If the static route isn’t there, check that you entered it correctly and that it’s not tied to an interface that’s down (if you specify an exit interface that goes down, the route is removed). The `show ip route` output will also indicate the **gateway of last resort** if a default route is set. In troubleshooting, ensure the networks you expect are present in the route table. If a connected network is missing, perhaps `ip routing` is off or the SVI is down.
- **Ping and Connectivity Tests:** The switch’s CLI lets you ping other IPs. You can ping from the switch to end devices or to the router to verify connectivity. For example, from Switch, `ping 192.168.10.10` (a host on VLAN 10) or `ping 10.0.0.1` (the router) to test reachability. If pings fail, consider: is the host online? Does it have the correct gateway? Does the router have a route back to VLANs? Often a routing issue is revealed by one-way ping success. E.g., switch can ping router, but hosts can’t reach router – likely the router needs routes for host subnets or default gateway on hosts is wrong.
- **Show Running-Config:** When all else fails, check the config. `show running-config` (or `show run`) will display the current configuration. Look for the relevant sections: Did the `ip routing` command stick (it should be visible under the config if enabled)? Are the interfaces configured as you intended? Is the static route present? Sometimes a typo (e.g., wrong VLAN ID, wrong IP) can be caught by reviewing the config. You might also compare with `show startup-config` if you want to ensure you saved correctly (and use `copy running-config startup-config` to save if needed).
- **Interface Status and Errors:** `show interfaces <interface>` gives detailed stats for a specific port, including packet counters and error counts. If a port is flapping or performing poorly, check for errors (e.g., CRC errors could indicate duplex mismatch or bad cable). Additionally, `show interfaces status` (mentioned earlier) will show if a port is err-disabled or half-duplex, etc., which can clue you in to issues like a speed/duplex mismatch.
- **Show CDP Neighbors:** Cisco Discovery Protocol (CDP) is on by default on many switches. `show cdp neighbors` can confirm what’s connected on the other side of a port (if it’s a Cisco device). This might help verify that your trunk port is indeed connected to the expected device, or at least that two Cisco devices see each other. For example, if Gi0/1 is trunking to another switch, `show cdp nei` should list that switch on Gi0/1. If not, maybe the link is not up or not Cisco or CDP disabled.
- **Check VLAN existence on all switches:** If inter-switch connectivity for a VLAN is broken, ensure each switch has that VLAN created. A common issue is forgetting to create VLAN X on one switch, so traffic for that VLAN is dropped at that switch. Use `show vlan` on each involved switch to verify.
- **Port Troubleshooting:** If a particular device can’t connect, ensure its port is in the right VLAN and not err-disabled. For instance, ports can go into err-disabled state due to security violations or STP issues. `show interface status` will show "err-disabled" if so. The causes vary (port security, BPDU guard, etc.), but re-enabling is done by fixing the issue and doing a `shutdown` and `no shutdown` on the interface.

In general, approach troubleshooting systematically: **Layer 1** (cables, link lights, speed/duplex), **Layer 2** (VLANs, port mode, trunks, MAC learning), **Layer 3** (IP addresses, routing table, gateway). The commands above help in each of these layers. Cisco also provides some integrated troubleshooting commands and wizards in newer IOS, but the above will serve you well.

Lastly, always save your working configuration (`copy run start` or on newer IOS `write memory`) so that it persists after a reboot. And maintain documentation of your VLAN IDs, IP subnets, and device ports – it helps in both planning and troubleshooting.
