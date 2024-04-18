# Netplan

Netplan is the Ubuntu network configuration tool for newer versions of Ubuntu.
It is often used versions above 20.04. Netplan is basically a replacement for interfaces file under `/etc/network/` folder that we use to configure network for older Ubuntu versions.
Netplan configuration fields are under `/etc/netplan`. Netplan configuration files uses `YAML` format.
Under `/etc/netplan`, you can find related `*.yaml` files that shows the configuration of network for that Ubuntu instance.
Netplan have a pre-determined naming structure for those yaml files. All YAML file should start with 2 digit number followed by a dash (e.g 01-netcfg.yml).
It is recommended to create different yaml files for each interface that you want to configure. Netplan applies the configuration in the numerical order. That means 01 file will be applied before the 02 file.
In Netplan, we configure networks by their interface name, so it is necessary to check interface names before moving on. To list interfaces, `ip a` command will help you.
After getting the name of interface, we can edit our interfaces now. Assume that our interface name is "enp3s0".

To have IP from DHCP for interface enp3s0 we can create a YAML file called "01-enp3s0.yaml" and fill it:

```yaml
network:
	version: 2
	renderer: networkd
	ethernets:
		enp3s0:
			dhcp4: true
```

To set a specific IP adress, we can also fill the same YAML file as:

```
network:
	version: 2
	renderer: networkd
	ethernets:
		enp3s0:
			addresses:
			- 10.10.10.2/24
			nameservers:
				addresses:
				- 10.10.10.1
				- 1.1.1.1
			routes:
			- to: default
			  via: 10.10.10.1
```


There are much more options that we can use, in this post I wanted to show the basics only.
Before applying any changes, we will test the configuration file. Run the followins command as sudo to test configurations:

```sudo netplan try```

If there is no issue, it will return the configuration accepted message. If the configuration file fails the test, it will be reverted to a previous working configuration.
To apply the configuration, we can follow the following command as sudo:

```sudo netplan apply```

In case of any error, we can run the same command in debug mode by following command:

```sudo netplan -d apply```

If there is no issue, you should have your brand new configured network. It is also good practice to restart network service before using it. To restart networking in Ubuntu Server:

```sudo systemctl restart system-networkd```