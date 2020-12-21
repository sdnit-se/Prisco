# Prisco -  **Pr**visioning C**isco**

> Zero Touch Provisioning for Cisco devices.

Detect and configure new Cisco devices in your network.

Use GUI or API endpoint in Prisco to recover your devices to the last backed up config.

## Overview

Prisco will intercept devices that is doing ZTP-boot, using DHCP and TFPT to detect and configure "new" devices, devices booting without config. Devices available for recovery will be present in a GUI which you can select. Prisco will use the latest backup to configure the device with.

Prisco is currently built for Cisco switches but can be extended to support any type of device that does TFTP boot.

### Backup

Prisco makes a backup of all Cisco switches added to the Ansible `group_vars` file which is later used to recover switches.

### New devices

If you want to setup a new switch (not backed up by Prisco) you can add it to the `group_vars` file and add the configuration manually to `CISCO_BACKUPS/{IP_ADDRESS}.conf`.

### Operation

When entering the GUI or calling the /api/leases endpoint Prisco looks at the dhcp.leases file in the DHCP container to get the current switches thats in ZTP-mode.  
If you choose one of the switches in ZTP-mode Prisco will ask for the hostname and IP address it should configure into the Switch. After the information is provided the process of "restoring" the switch will start by Prisco sending the configuration from the `CISCO_BACKUP` folder to the switch and schedule a reboot with the configuration as startup-config.

## Architecture

### Docker containers

### WEB, API and Ansible

* A Vuejs application gives the user a graphical user interface to work in.
* Rest-API for provisioning as an alternative to the GUI.
* `Ansible` for backup of all switches configured in the `group_vars`.
* `Ansible` to configure switches configured via API or GUI.

### TFTP SERVER

Hosting of Basic Configuration to give Prisco access to the switch.

### DHCP SERVER

ISC DHCP acting as first interaction with the world for switches. It will point the switch to the configuration file in the TFTP server.

## Setup

The easiest way to run Prisco is with docker-compose. First edit files on the host, they will later be used by the containers.

1. Run the `./start.sh` bash script and fill out the information needed.
1. Edit `WEB/backend/ansible/ztp_inventory.yml` and add the DHCP range that the ZTP switches will be given from the DHCP server container.
1. Now we need to add all IP addresses/ranges for all Cisco switches in the network to `all_switches`. This will be used by the WEB container to backup the configuration.
1. Add credentials for PRISCO to use when jumping to each host and backing up the configuration. This is done in: `WEB/backend/ansible/group_vars/all_switches.yml`
1. Start the three containers by running the following command from the Prisco folder:
`docker-compose build; docker-compose up -d`

### Networking considerations

Make sure to have the following ports open _on the host running the containers_:

* TCP port 80 for WEB GUI and API endpoint
* UDP port 67 and 68 for DHCP
* UDP port 69 for TFTP Server
