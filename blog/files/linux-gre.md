# GRE Tunnel

## Definition and Purpose

Generic Routing Encapsulation (GRE) is a tunneling protocol (originally developed by Cisco) that encapsulates one network protocol inside another, effectively allowing a packet to be carried within a different kind of packet. In practical terms, GRE creates a virtual point-to-point connection between network devices (e.g. routers), so that two separate networks can communicate as if they are directly connected. The primary purpose of GRE is to enable the transport of packets across an intermediate network that might not support the packet’s native protocol. For example, GRE can wrap IPv6 traffic inside IPv4 packets, allowing IPv6 networks to communicate over an IPv4-only backbone. It is a non-encrypted, stateless tunnel used to carry many types of traffic (unicast, multicast, IPv4, IPv6, etc.) between endpoints. GRE is often used in conjunction with IPsec when encryption or authentication is required, since GRE by itself does not secure the content of the encapsulated packets.

- [GRE Tunnel](#gre-tunnel)
  - [Definition and Purpose](#definition-and-purpose)
  - [Use Cases](#use-cases)
    - [Lab Network Simulation](#lab-network-simulation)
    - [Connecting Isolated Networks](#connecting-isolated-networks)
    - [Protocol Transport across Legacy Networks](#protocol-transport-across-legacy-networks)
    - [Overlay Networks and Testing](#overlay-networks-and-testing)
  - [How GRE Works](#how-gre-works)
  - [Advantages and Disadvantages of GRE](#advantages-and-disadvantages-of-gre)
    - [Advantages:](#advantages)
    - [Disadvantages / Limitations:](#disadvantages--limitations)
  - [Configuring GRE on Ubuntu (Manual Setup)](#configuring-gre-on-ubuntu-manual-setup)
  - [Configuring GRE via Netplan (YAML)](#configuring-gre-via-netplan-yaml)
  - [Testing and Verifying a GRE Tunnel](#testing-and-verifying-a-gre-tunnel)

## Use Cases

GRE tunnels are widely used in lab setups and certain remote networking scenarios due to their simplicity and flexibility. Common use cases include some of the scenarios below.

### Lab Network Simulation

In networking labs or GNS3/packet-tracer environments, GRE tunnels can connect multiple virtual routers or networks. GRE supports multiprotocol traffic (IPv4, IPv6, multicast, etc.), making it suitable for simulating WAN links or testing routing protocols like OSPF/BGP between lab routers. For instance, you can use GRE to tunnel multicast routing updates through a lab topology, as GRE will carry multicast packets that a simple IP-in-IP tunnel would drop.

### Connecting Isolated Networks

GRE provides a way to connect two networks across an existing IP infrastructure. In remote setups, if two sites need to appear as one Layer-3 network (for protocols that might not traverse NAT or an internet connection natively), a GRE tunnel can link their routers. This is useful for site-to-site connections over the internet (often paired with IPsec for security) – e.g., connecting a branch office network to HQ for routing protocol adjacency or testing new network configurations.

### Protocol Transport across Legacy Networks

GRE’s encapsulation allows transporting protocols that the transit network doesn’t support. A classic scenario is tunneling IPv6 over an IPv4-only network or carrying non-IP traffic (like legacy AppleTalk or multicast streams) across an IP network. In a lab, you might deliberately introduce a GRE tunnel to pass IPv6 through an IPv4 test network to observe how encapsulation works.

### Overlay Networks and Testing

In cloud labs or virtualization setups, GRE can build an overlay network between VMs or containers. This is handy for temporarily linking environments (for example, linking a developer’s test VM to a remote lab network) without altering the underlying network. GRE’s stateless nature means it has low overhead to set up, which is convenient for on-demand lab connections.

## How GRE Works

GRE works by encapsulating the original passenger packet inside a GRE header and a new outer IP header (the delivery header). This encapsulation process wraps one packet inside another, like putting a letter inside an envelope. The steps in packet flow are:

- Encapsulation on Sender: When a packet (of some protocol) needs to traverse a GRE tunnel, the sending router takes the original packet and adds a GRE header to it, followed by a new IP header (with source and destination equal to the GRE tunnel endpoints). The GRE header indicates the protocol type of the inner packet and other flags. The new outer IP header’s protocol field is set to GRE (protocol number 47) and addresses correspond to the tunnel endpoints (the “ferry” for our “car”, to use a common analogy).
- Transit: The encapsulated packet (outer IP + GRE + inner packet) is sent over the intermediate network. Routers in the middle only see the outer IP packet (they view it just like any other IP traffic between the two tunnel endpoints) and do not need to understand or modify the GRE encapsulation. The intermediate network simply forwards the packet based on the outer IP header.
- Decapsulation on Receiver: When the packet reaches the GRE endpoint on the far side, that router recognizes the packet as a GRE packet destined for the tunnel interface. It removes the outer IP header and GRE header, revealing the original packet, which it then processes or forwards onward as if it arrived on a direct link from the sending router.

This process effectively creates a logical tunnel between the two endpoints – often described metaphorically as a “tunnel through a mountain” that the packets travel inside of, unseen by the outside world. Importantly, GRE is stateless and does not by itself guarantee delivery or provide encryption: it simply encapsulates and decapsulates packets. If needed, reliability must be handled by inner protocols, and confidentiality by an additional protocol (like IPsec ESP) on top of GRE.

## Advantages and Disadvantages of GRE

### Advantages:

1. **Protocol Agnostic & Multicast Support:** GRE can carry a variety of network layer protocols (IPv4, IPv6, IPv6-in-IPv4, etc.) and even multicast/broadcast traffic, which some simpler tunnels (like plain IP-in-IP) cannot. This makes GRE ideal for routing scenarios (e.g., running multicast routing or dynamic routing protocols through the tunnel).

2. **Simplicity and Compatibility:** GRE is a lightweight protocol with minimal overhead. It’s widely implemented on routers and Linux, and configuration is straightforward. There’s no complex handshake or negotiation – one end encapsulates and the other decapsulates. This simplicity is useful in lab environments where quick setup is needed.

3. **Virtual Point-to-Point Link:** By creating a logical point-to-point interface, GRE simplifies network design. Remote networks can be connected with a tunnel interface on each end, allowing the use of internal IP addressing across sites and making two distant routers appear to be directly connected neighbors. This can simplify routing tables and configurations for lab testing by abstracting the intermediate hops.

4. **Combining with Other Protocols:** GRE tunnels can be used in combination with IPsec for security (IPsec provides encryption/authentication, GRE provides multiprotocol tunneling). This combination is common for secure site-to-site VPNs. GRE also works with overlay networks and can run on top of any IP transport, giving flexibility in various network setups.

### Disadvantages / Limitations:

1. **No Built-in Security:** GRE does not encrypt or authenticate the tunneled packets. The contents are visible to anyone who can capture the outer packets. For secure use (especially over untrusted networks like the Internet), GRE usually needs to be paired with IPsec or another encryption mechanism. Without additional security, GRE is unsuitable for protecting sensitive data.

2. **Overhead and MTU Issues:** The GRE header (plus new IP header) adds extra bytes to each packet. This overhead reduces the effective MTU for tunneled traffic, potentially requiring MTU tweaks or fragmentation handling. In lab setups, if you encounter unexplained packet loss, an MTU mismatch due to GRE overhead could be the cause. Each GRE packet typically has an overhead of 24 bytes (20-byte new IP header + 4-byte GRE header, more if optional fields are used).

3. **NAT and Firewall Unfriendliness:** GRE uses IP protocol number 47, not UDP/TCP, making it harder to pass through NAT. Many NAT routers don’t handle GRE by default, so additional configuration (e.g., explicit GRE port forwarding or an ALG) is often required. This can complicate remote scenarios if one endpoint is behind a NAT device. In contrast, newer VPN protocols (like WireGuard or OpenVPN) use UDP/TCP which are easier for NATs/firewalls.

4. **Scalability and Management:** Each GRE tunnel is a point-to-point link. Managing many tunnels (each with separate configurations) can become complex in larger networks. In a lab with a few tunnels this is fine, but for dozens of sites, administrating numerous GRE interfaces and keeping track of endpoints can be error-prone. There’s also no built-in keepalive (though Cisco and Linux support optional GRE keepalives) – so detecting a failed GRE peer might require additional monitoring or protocols.

## Configuring GRE on Ubuntu (Manual Setup)

Setting up a GRE tunnel on Ubuntu manually involves using the Linux ip utility to create a tunnel interface and configuring it with the desired endpoints and IP addressing. Below are the general steps to configure a GRE tunnel manually on two Ubuntu hosts (call them Host A and Host B) using the command line:

_Prerequisites:_ Ensure both systems have IP connectivity between them (e.g., via the public Internet or a routable network) and know each other’s IP addresses. Also, load the GRE module (if not already loaded in the kernel). In Ubuntu, the GRE module (ip_gre) is usually built-in or auto-loaded, but you can run sudo modprobe ip_gre to be sure.

1. **Create the GRE Tunnel Interface:** On Host A, use the ip tunnel command to add a new GRE interface. For example:

```bash
sudo ip tunnel add gre0 mode gre local <HOST_A_PUBLIC_IP> remote <HOST_B_PUBLIC_IP> ttl 255
```

This defines a tunnel named gre0 in GRE mode, setting Host A’s local tunnel source and Host B’s remote endpoint. The ttl 255 ensures the encapsulated packets use a TTL of 255 (you can also use inherit to copy the inner packet’s TTL). Repeat a similar command on Host B, swapping the local and remote IPs (Host B’s local IP and Host A’s as remote).

2. **Assign IP Addresses to Tunnel Interfaces:** Decide on an IP subnet to use for the GRE tunnel itself (often a private /30 or /31 subnet for point-to-point). For instance, use 10.0.0.1/30 for Host A and 10.0.0.2/30 for Host B as tunnel interface IPs. On Host A:

```bash
sudo ip addr add 10.0.0.1/30 dev gre0
```

On Host B:

```bash
sudo ip addr add 10.0.0.2/30 dev gre0
```

This assigns each end an IP inside the tunnel network. (Alternatively, you can use the peer keyword with a /32 address as shown in some documentation, but using a /30 is straightforward for labs.)

3. **Bring the Tunnel Interfaces Up:** Enable the interfaces with:

```bash
sudo ip link set gre0 up
```

(Run on both hosts.) At this point, each host has a GRE tunnel interface up and configured. You can verify with ip addr show gre0 to see the interface and IP, and ip link show gre0 to ensure it’s UP.

4. **Update Routing (if needed):** If your goal is to route specific subnet traffic through the GRE tunnel, add static routes on each side. For example, if Host A’s side network (say 192.168.10.0/24) needs to reach Host B’s side network (192.168.20.0/24) via the tunnel, you would add on Host A:

```bash
sudo ip route add 192.168.20.0/24 via 10.0.0.2 dev gre0
```

And on Host B:

```bash
sudo ip route add 192.168.10.0/24 via 10.0.0.1 dev gre0
```

This directs traffic for the remote LAN to go through the tunnel (using the tunnel IP of the far end as the next hop). In a simple lab test where you only care about the tunnel endpoints pinging each other, additional routes may not be necessary, but in a realistic scenario connecting networks, routes are required so that each side knows how to reach the other’s internal subnets.

5. **Enable IP Forwarding (if routing between LANs):** On each host, if the host is acting as a router for a local subnet through the GRE tunnel, ensure IP forwarding is turned on:

```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

You can make this persistent by editing /etc/sysctl.conf. Without this, the host won’t forward packets from its LAN through the tunnel.

6. **Firewall Considerations:** If ufw or iptables is running, you might need to allow GRE protocol traffic. GRE is not UDP/TCP, so ensure any firewall allows protocol 47 from Host A to Host B and vice versa. If the GRE endpoints are behind NAT devices, those devices must support and forward GRE (which can be tricky). In lab setups on the same LAN or with public IPs, this typically isn’t an issue.

After these steps, the GRE link should be established. You can test basic connectivity as described in the testing section below. For persistence, note that the above configuration will not survive a reboot. In production, you might script these ip commands in /etc/rc.local or use Ubuntu’s networking (/etc/netplan or systemd-networkd configuration, described next) to automatically recreate the tunnel on boot.

## Configuring GRE via Netplan (YAML)

Ubuntu’s Netplan can configure GRE tunnels declaratively using YAML, which is especially handy for consistent setup across reboots. Netplan is available on Ubuntu 18.04+ and uses either NetworkManager or systemd-networkd as a backend (for server systems, networkd is typically used, and it supports tunnels like GRE). Ensure the target Ubuntu uses netplan version 0.99 or newer (WireGuard support was added in 0.99, GRE support exists in earlier versions, but we assume 20.04 with updates is sufficient).

A sample Netplan YAML configuration for a GRE tunnel looks like this:

```yaml
network:
  version: 2
  renderer: networkd
  tunnels:
    gre0:
    mode: gre
    local: 192.168.1.100 # Local endpoint public IP
    remote: 203.0.113.1 # Remote endpoint public IP
    addresses: [10.0.0.1/30] # Tunnel interface IP for this side
    routes:
      - to: 10.0.2.0/24
        via: 10.0.0.2
```

In this example, the system’s public IP is 192.168.1.100 and it’s setting up a GRE tunnel to a remote peer at 203.0.113.1. The tunnel interface (gre0) on this side gets IP 10.0.0.1/30, and a static route is defined so that traffic destined for 10.0.2.0/24 will be routed via the tunnel (with 10.0.0.2 as the next hop, presumably the IP of the other end of the GRE tunnel). You would apply a complementary Netplan config on the remote side (with local/remote flipped, and using 10.0.0.2/30 as that end’s tunnel IP, plus appropriate routes).

Applying the Netplan config: Save the YAML under `/etc/netplan/`, e.g., `/etc/netplan/gre-tunnel.yaml`. Then run:

```bash
sudo netplan generate # checks for syntax
sudo netplan apply # applies the configuration
```

This will create the gre0 interface and bring it up. (You can use sudo netplan try for a safe test; it will roll back if something is wrong, which is useful if you’re modifying network configs over SSH.)

One advantage of Netplan is that it will recreate the tunnel on boot (since the config is saved). It’s also easier to store version-controlled configurations for your network. Netplan’s renderer is set to networkd in the example because NetworkManager typically doesn’t handle GRE tunnels. If you are on a GUI system using NetworkManager, consider switching that specific config to networkd or using ifupdown instead for GRE, as appropriate.

## Testing and Verifying a GRE Tunnel

After configuring the GRE tunnel (manually or via Netplan), you should verify that it’s working correctly:

- Interface Status: Use ip link show gre0 (or ip addr show gre0) to verify the GRE interface is UP and has the correct IP address assigned. For example, the output should show gre0@NONE: <POINTOPOINT,...,UP,LOWER_UP> with the configured IP (10.0.0.1/30 on one side, 10.0.0.2/30 on the other).
- PING Test: The simplest test is to ping the tunnel IP of the remote end. From Host A, try ping 10.0.0.2 (the IP of Host B’s GRE interface). Likewise from Host B, ping 10.0.0.1. Successful pings indicate that the GRE encapsulation/decapsulation is functioning and the two ends can reach each other through the tunnel. If the ping fails:
  - Check that local and remote IPs in the tunnel config are correct (they must match the actual source IP each host uses to reach the other).
  - Ensure firewalls aren’t blocking GRE (protocol 47). Temporaryly disable ufw/iptables to test if needed.
  - If behind NAT, ensure GRE is forwarded or try testing with both endpoints on public IPs (NAT issues are common with GRE).
- Route Testing: If you configured routes through the GRE (to reach remote subnets), test connectivity to those subnets. For example, ping from a host on Site A’s LAN to a host on Site B’s LAN. If it fails, use traceroute or ip route get <IP> to see if traffic is going into the tunnel. Make sure the static routes are in place on both sides and that IP forwarding is enabled so that the packets actually traverse the tunnel.
- Inspection Tools: You can use tcpdump on the underlying network interface (e.g., eth0) to observe GRE packets in action. For instance:

```bash
sudo tcpdump -i eth0 proto 47 -vv
```

This will show GRE packets on the wire (proto 47). You should see packets when pings or other traffic go over the tunnel. This confirms that encapsulation is happening. On the receiving end, you can similarly capture and see the packets arriving.

- GRE Tunnel Statistics: The command ip -s link show gre0 will display packet counters for the GRE interface. This can tell you if packets are being transmitted/received, and if errors or drops are occurring. Immediately after a ping test, you should see the RX/TX packet counts increment on both sides’ gre0 interfaces.
- Troubleshooting Tips: If no traffic is seen, double-check that the local IP you set in the tunnel config is indeed the IP of the outgoing interface. On a multihomed system, if packets are exiting from a different IP than expected, the remote end will drop them (because the source doesn’t match the configured local). Also verify both ends configured the same GRE key if a key was used (by default no key is used in our steps; if you configure a key, both sides must match). Netplan as of this writing may not support setting a key on GRE (just a note).
