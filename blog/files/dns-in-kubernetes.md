# DNS in Kubernetes

Kubernetes creates DNS records for pods and services. Each pod and service have a unique DNS address in the cluster. Instead of IP adresses, pods and services uses DNS records to communicate with each other. In this article, I will try to explain DNS structure in kubernetes and how kubernetes handles it.

## Overview

Kubelet configures pods' DNS so that running containers can lookup services by name rather than IP addresses. This is one of the main functions of the kubelet. It is responsible to assign DNS records during creation of containers.\
Services defined in the cluster are assigned DNS names. By default, a client pod's DNS search list includes the pod's own namespace and clusters default domain name.

A DNS query may return different results based on the namespace of the pod making it. DNS queries without a namespace are litimed to the pod's namespace. So in the same namespace, we may use the service name, but for different namespaces it is necessary to specify namespace on DNS queries.

### Format of a DNS record for a service

In kubernetes, format of a DNS record for a service is defined as:

```
<service-name>.<namespace>.svc.<root-name>

as an example:
my-service.my-namespace.svc.cluster.local
```

> root-name defines the name of the current cluster. By default it's value is `cluster.local`, but it is possible to modify it.

### Format of a DNS record for a pod

In kubernetes, format of a DNS record for a pod is defined as:

```
<pod-ip-address-replace-dot-with-hypen>.<namespace>.pod.<root-name>

as an example:
110-1-1-5.my-namespace.pod.cluster.local
```

## CoreDNS

Starting from Kubernetes version 1.11, CoreDNS is the recommended DNS solution for kubernetes (formerly it was kube-dns). CoreDNs is installed by default with kubeadm.\
CoreDNS is an open solution DNS service. It has a text file called `Corefile` wtich we define the configuration of CoreDNS. In that file, it is possible to configure kubernetes by using kubernetes plugin.

An example `Corefile` should look like:

```md
.:53 {
	...
	...
	kubernetes cluster.local in-addr.arpa ip6.arpa {
		pods insecure
		fallthrough in-addr.arpa ip6.arpa
		ttl 30
	}
	...
	...
}
```

Root DNS name `cluster-local` is defined on `Corefile`.

## Hostnames and Subdomains

Currently, when a pod is created, its hostname is the pod's `metadata.name` value. The pod spec has an additional `spec.hostname` field to specify a different hostname if desired. Additionally, pod spec has an additional `spec.subdomain` field to assign a subdomain for a pod.

For example, consider the yaml file below:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: busybox-subdomain
spec:
  selector:
    name: busybox
  clusterIP: None
  ports:
  - name: foo # name is not required for single-port Services
    port: 1234
---
apiVersion: v1
kind: Pod
metadata:
  name: busybox1
  namespace: my-namespace
  labels:
    name: busybox
spec:
  hostname: busybox-1
  subdomain: busybox-subdomain
  containers:
  - image: busybox:1.28
    command:
      - sleep
      - "3600"
    name: busybox
---
```

This pod's service FQDN should be: `busybox1-busybox-subdomain.my-namespace.svc.cluster-local`

## Pod DNS Policy

There are different DNS policy for pods. DNS policies can be set on per-pod basis. We can change DNS pod policy by changing `spec.dnsPolicy` field. DNS policy options are:

- `Default`: the pod inherits the name resolution configuration from the node that pods run on.
- `ClusterFirst`: Any DNS query that does not match the configured cluster domain suffix is forwarded to an upstream nameserver by the DNS erver. Cluster administrators may have extra sub-domain and upstream DNS servers configured.
- `ClusterFirstWithHostNet`: For pods running with `hostNetwork`, it is necessary to explicitly set its DNS policy to `ClusterFirstWithHostNet`. Otherwise, Pods running with hostNetwork and `ClusterFirst` will fallback to the behavior of the `Default` policy.
- `None`: It allows pod to ignore DNS settings from the Kubernetes environment. All DNS settings are supposed to be provided using `dnsConfig` field in pod spec.

> `Default` is not the default DNS policy. If `dnsPolicy` is not explicitly specified, then `ClusterFirst` is used.

An example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  namespace: default
spec:
  containers:
  - image: busybox:1.28
    command:
      - sleep
      - "3600"
    imagePullPolicy: IfNotPresent
    name: busybox
  restartPolicy: Always
  hostNetwork: true
  dnsPolicy: ClusterFirstWithHostNet
```

## Pod DNS Config

Pod's DNS Config allows users more control on the DNS settings for a pod.

The `dnsConfig` field is optional and it can work with any `dnsPolicy` settings. However, when a Pod's `dnsPolicy` is set to `None`, the dnsConfig field has to be specified.

Below are the properties a user can specify in the dnsConfig field:
- `nameservers`: a list of IP addresses that will be used as DNS servers for the Pod. There can be at most 3 IP addresses specified. When the Pod's `dnsPolicy` is set to `None`, the list must contain at least one IP address, otherwise this property is optional. The servers listed will be combined to the base nameservers generated from the specified DNS policy with duplicate addresses removed.
- `searches`: a list of DNS search domains for hostname lookup in the Pod. This property is optional. When specified, the provided list will be merged into the base search domain names generated from the chosen DNS policy. Duplicate domain names are removed. Kubernetes allows up to 32 search domains.
- `options`: an optional list of objects where each object may have a `name` property (required) and a `value` property (optional). The contents in this property will be merged to the options generated from the specified DNS policy. Duplicate entries are removed.

```yaml
apiVersion: v1
kind: Pod
metadata:
  namespace: default
  name: dns-example
spec:
  containers:
    - name: test
      image: nginx
  dnsPolicy: "None"
  dnsConfig:
    nameservers:
      - 192.0.2.1 # this is an example
    searches:
      - ns1.svc.cluster-domain.example
      - my.dns.search.suffix
    options:
      - name: ndots
        value: "2"
      - name: edns0
```

When the Pod above is created, the container test gets the following contents in its `/etc/resolv.conf` file:

```
nameserver 192.0.2.1
search ns1.svc.cluster-domain.example my.dns.search.suffix
options ndots:2 edns0
```