# Understanding iptables: A Practical Guide to Linux Packet Filtering & NAT

Linux systems are incredibly powerful when it comes to networking, and one of the most important technologies behind this power is **iptables**. Whether you're building a router, configuring a firewall, or managing NAT (Network Address Translation), iptables sits at the core of packet flow control in Linux.

In this article, we explore what iptables is, how it works, and the most essential concepts you need to understand before writing your first rule.

---

- [Understanding iptables: A Practical Guide to Linux Packet Filtering \& NAT](#understanding-iptables-a-practical-guide-to-linux-packet-filtering--nat)
  - [What Is iptables?](#what-is-iptables)
  - [How iptables Works Internally](#how-iptables-works-internally)
    - [INPUT](#input)
    - [OUTPUT](#output)
    - [FORWARD](#forward)
    - [PREROUTING](#prerouting)
    - [POSTROUTING](#postrouting)
  - [Tables: Where Rules Live](#tables-where-rules-live)
  - [The Structure of an iptables Rule](#the-structure-of-an-iptables-rule)
    - [Components:](#components)
  - [Common Commands](#common-commands)
  - [Useful Matches](#useful-matches)
  - [Targets: What Happens to the Packet](#targets-what-happens-to-the-packet)
  - [Practical Examples: When and Where to Use iptables](#practical-examples-when-and-where-to-use-iptables)
    - [**1. Allow SSH Access to the Server**](#1-allow-ssh-access-to-the-server)
    - [**2. Basic NAT (Masquerading) for Internet Sharing**](#2-basic-nat-masquerading-for-internet-sharing)
    - [**3. Port Forwarding (DNAT)**](#3-port-forwarding-dnat)
    - [**4. Drop All Incoming Traffic Except Specific Services**](#4-drop-all-incoming-traffic-except-specific-services)
    - [**5. Allow Forwarding Between Two Networks**](#5-allow-forwarding-between-two-networks)
    - [**6. Drop Packets from a Specific IP**](#6-drop-packets-from-a-specific-ip)
  - [Final Thoughts](#final-thoughts)

## What Is iptables?

**iptables** is a userspace utility that allows administrators to configure the **netfilter** framework inside the Linux kernel.

Its primary purpose is to:

- Allow or block traffic
- Modify packets (NAT, DNAT, SNAT)
- Forward traffic between networks
- Apply firewall rules
- Track connections using stateful filtering

Put simply: **iptables is the interface; netfilter is the engine** that actually processes packets.

---

## How iptables Works Internally

Understanding iptables requires understanding how packets travel inside Linux. Every incoming or outgoing packet passes through a set of checkpoints called **chains**.

Here’s the simplified flow:

```
                [Incoming packet]
                       |
               PREROUTING (nat/mangle)
                       |
               Routing decision
              /                     \
         INPUT (local apps)      FORWARD (router mode)
              \\                     /
               POSTROUTING (nat/mangle)
                       |
                [Outgoing packet]
```

Each chain has a specific purpose:

### INPUT

Packets destined for the local system.

### OUTPUT

Packets generated on the local system.

### FORWARD

Packets being routed through the system (useful when Linux acts as a router).

### PREROUTING

Packet changes **before** the routing decision — typically used for DNAT.

### POSTROUTING

Packet changes **after** routing — typically used for SNAT or MASQUERADE.

---

## Tables: Where Rules Live

iptables stores rules inside different **tables**, each designed for different purposes:

- **filter** — main firewall table (ACCEPT/DROP)
- **nat** — network address translation (DNAT/SNAT)
- **mangle** — packet header modification (TTL, TOS)
- **raw** — bypass connection tracking
- **security** — SELinux labeling

Each table contains its own chains.

---

## The Structure of an iptables Rule

All iptables rules follow a structured, readable pattern:

```
iptables [-t table] command chain match -j target
```

### Components:

- **Table** — optional (default is `filter`)
- **Command** — what to do (append, delete, list)
- **Chain** — where the packet is in the flow
- **Match** — protocol/port/source/destination
- **Target** — action (ACCEPT, DROP, DNAT, SNAT)

---

## Common Commands

- `-A` — append rule
- `-I` — insert rule
- `-D` — delete rule
- `-L` — list rules
- `-F` — flush chain rules
- `-P` — set default policy

---

## Useful Matches

- `-p` — protocol (tcp/udp/icmp)
- `-s` — source IP
- `-d` — destination IP
- `--sport` — source port
- `--dport` — destination port
- `-i` — input interface
- `-o` — output interface
- `-m conntrack --ctstate` — connection state

---

## Targets: What Happens to the Packet

- **ACCEPT** — allow packet
- **DROP** — silently drop
- **REJECT** — drop with an error response
- **DNAT** — change destination IP
- **SNAT** — change source IP
- **MASQUERADE** — dynamic SNAT for WAN interfaces

---

## Practical Examples: When and Where to Use iptables

### **1. Allow SSH Access to the Server**

This is one of the most common rules. When your server needs to accept SSH connections:

```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

**When to use:**

- Remote management
- Secure administrative access

---

### **2. Basic NAT (Masquerading) for Internet Sharing**

When turning a Linux machine into a router so that LAN clients can access the internet:

```bash
iptables -t nat -A POSTROUTING -o enp0s5 -j MASQUERADE
```

**When to use:**

- Home labs
- Virtual machines needing outbound internet
- Small office networks using a Linux firewall

---

### **3. Port Forwarding (DNAT)**

Forward traffic from WAN to a web server in the LAN:

```bash
iptables -t nat -A PREROUTING -p tcp --dport 80 \
  -j DNAT --to-destination 192.168.1.10:80
```

**When to use:**

- Hosting a website behind NAT
- Forwarding services like SSH, HTTP, VoIP

---

### **4. Drop All Incoming Traffic Except Specific Services**

A common firewall approach:

```bash
iptables -P INPUT DROP
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

**When to use:**

- Hardening public-facing servers
- VPS security
- Protecting resources on untrusted networks

---

### **5. Allow Forwarding Between Two Networks**

If the Linux machine routes between two LANs:

```bash
iptables -A FORWARD -i enp0s3 -o enp0s5 -j ACCEPT
iptables -A FORWARD -i enp0s5 -o enp0s3 -j ACCEPT
```

**When to use:**

- Multi-subnet setups
- Lab networks
- VLAN interconnection

---

### **6. Drop Packets from a Specific IP**

A simple way to block a malicious host:

```bash
iptables -A INPUT -s 203.0.113.50 -j DROP
```

**When to use:**

- Blocking attackers or scanners
- Preventing brute-force attempts

---

## Final Thoughts

iptables is a foundational skill for anyone working with Linux networking, routing, virtualization, or security. Once you understand the packet flow and structure of rules, it becomes a powerful and flexible tool.

Future posts can explore:

- NAT setups
- Port forwarding
- Stateful firewall design
- Debugging with conntrack and tcpdump

Mastering iptables unlocks full control over traffic inside Linux — from simple firewalls to enterprise-grade routing setups.
