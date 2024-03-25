# Network Namespace (netns)

A network namespace is a feature in Linux that allows you to create isolated network environments within a single Linux system. Each network namespace has its own network stack including network interfaces, routing tables, firewall rules and other network-related resources (like ARP tables). This isolation allows you to run multiple independent network environments on the same physical or virtual machine, keeping them separate from each other.

Modern containerization solutions (like kubernetes, docker) uses network namespaces to provide isolated networking environments for each container. This 
isolation ensures that containers cannot interfere with each other's network configrations - an abstraction.


- [Network Namespace (netns)](#network-namespace-netns)
  - [Creating Network Namespaces on Debian](#creating-network-namespaces-on-debian)
  - [Bridge Network](#bridge-network)


## Creating Network Namespaces on Debian 

To create a network namespace, we use the following command:

```bash
ip netns add $netns_name
```

Let's create two network namespaces by following commands:

```bash
ip netns add netns1
ip netns add netns2
```

To list network namespaces and their interfaces:

```bash
ip netns
#netns2
#netns1

# to list interfaces
$ ip link

# to list interface on a namespace
$ ip netns exec $namespace_name ip link
$ ip -n $namespace_name link

```

To establish a connection between namespaces, we use virtual interfaces (like virtual cables that connect different namespaces).\
To create virtual interface:

```bash
$ ip link add $interface_for_namespace_1 type veth peer name $interface_for_namespace_2
# ip link add veth-netns1 type veth peer name veth-netns2
```

To link veth interfaces with network namespaces:

```bash
$ ip link set $interface_for_namespace_1 netns $namespace_name1
# ip link set veth-netns1 netns netns1
# ip link set veth-netn2 netns netns2
```

To assign IP address to virtual interfaces:

```bash
$ ip -n $namespace_name_1 addr add $namespace_1_IP dev $interface_for_namespace_1
# ip -n netns1 addr add 192.168.15.1/24 dev veth-netns1
# ip -n netns2 addr add 192.168.15.2/24 dev veth-netns2
```

To activate virtual interfaces:

```bash
$ ip -n $namespace_name_1 link set $interface_for_namespace_1 up
# ip -n netns1 link set veth-netns1 up
# ip -n netns2 link set veth-netns2 up
```

Now, our network namespaces should be able to communicate with each other by using our virtual interface.

To ping:

```bash
$ ip netns exec $namespace_name1 ping $namespace_2_IP
# ip netns exec netns1 ping 192.168.15.2
```

So we should be able to ping network namespace2 from network namespace1 by using virtual interface.

The solution above is applicable for two peers. When we increase number of peers, this method will be very hard to maintain. For multiple peer setups, constructing a `bridge network` is a preferred solution.

## Bridge Network

A Linux bridge is a kernel module that behaves like a network switch, forwarding packets between interfaces that are connected to it. It's usually used for forwarding packets on routers, on gateways, or between VMs and network namespaces on a host.

There are multiple solutions for creating a bridge network in linux. `Linux Bridge` is one of them. To create a bridge network:

```bash
$ ip link add $bridge_network_name type bridge
# ip link add v-net-0 type bridge
$ ip link set dev $bridge_network_name up
# ip link set v-net-0 up
```

Next, we should connect our network namespaces to brigde network. To do this, we should create virtual interface for each network namespace, and use that as a connection between namespace and bridge network.

```bash
$ ip link add $interface_for_namespace_1 type veth peer name $interface_for_namespace_bridge_1
# ip link add veth-netns1 type veth peer name veth-netns1-br
# ip link add veth-netns2 type veth peer name veth-netns2-br

$ ip link set $interface_for_namespace_1 netns $namespace_name_1
# ip link set veth-netns1 netns netns1
# ip link set veth-netns2 netns netns2

$ ip link set $interface_for_namespace_bridge_1 master $bridge_network_name
# ip link set veth-netns1-br master v-net-0
# ip link set veth-netns2-br master v-net-0

$ ip -n $namespace_name_1 addr add $namespace_1_IP dev $interface_for_namespace_1
# ip -n netns1 addr add 192.168.15.1/24 dev veth-netns1
# ip -n netns2 addr add 192.168.15.2/24 dev veth-netns2

$ ip -n $namespace_name_1 link set $interface_for_namespace_1 up
# ip -n netns1 link set veth-netns1 up
# ip -n netns2 link set veth-netns2 up
```

To assign an IP to bridge network:

```bash
$ ip addr add $host_bridge_IP dev $bridge_network_name
# ip addr add 192.168.15.5/24 dev v-net-0
```

We should be able to ping namespace networks from the host by using the bridge network.

To have connection from our network namespace to other networks, we need to add a route by using our bridge. Our exit point should be the interface on the host.

```bash
$ ip netns exec $namespace_name1 ip route add $brige_network_IP via $host_bridge_IP
# ip netns exec netns1 ip route add 192.168.1.0/24 via 192.168.15.5
```

As a last step, we should configure NAT on our host machine. Without NAT, host machine does not interpret namespace's IP addresses and the message sent from namespaces does not have proper way and/or routes on the other end. To configure NAT:

```bash
$ iptables -t nat -A POSTROUTING -s $brige_network_IP -j MASQUERADE
# iptables -t nat -A POSTROUTING -s 192.168.15.0/24 -j MASQUERADE
```


Overall process can be summarized as follows:
1. Create network namespaces.
2. Create bridge network
3. Create virtual interfaces for each namespace.
4. Connect virtual interfaces to brigde network and each namespace.
5. Assign IP address for each namespace and bridge network.
6. Set links up.
7. Set route for network namespaces.
8. Enable NAT by IP Masquerade.