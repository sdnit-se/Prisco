## Prisco -  Zero Touch Provisioning for Cisco
Prisco automatically detects new switches in the network connected to the DHCP Server.
Create or recover a switch by either call the API endpoints or use the GUI. 

### Quick Links:
- [How does Prisco work?](#How does Prisco work)
- [Docker containers](#Docker containers)
- [Setup](#setup)

## How does Prisco work?
Prisco makes a backup of all Cisco switches added to the Ansible group_vars file which is later used to recover switches. If you want to setup a new switch you can add it to the group_vars file and add the configuration manually to ```CISCO_BACKUPS/{IP_ADDRESS}.conf```.

When entering the GUI or calling the /api/leases endpoint Prisco looks at the dhcp.leases file in the DHCP container to get the current switches thats in ZTP-mode.
If you choose one of switches in ZTP-mode Prisco will ask for the hostname and IP address it should configure into the Switch. After the information is provided the process of "restoring" the switch will start by Prisco sending the configuration from the CISCO_BACKUP folder to the switch schedual a reboot with the configuration as startup-config.

## Docker containers
- TFTP Server
- DHCP Server
- WEB (GUI & API)

**TFTP SERVER**
Hosting of Basic Configuration to give Prisco access to the switch.

**DHCP SERVER** (Running ISC dhcpd)
First interaction with the world will be with the DHCP Server. It will point the switch to the configuration file in the TFTP server.

**WEB** (Running Ansible, Python3)
Hosting the provisioning endpoints and the wonderful vuejs GUI to interact with it directly without the knowledge of rest. WEB container does a backup of all switches configured in the group_vars file every sunday through Ansible.

## SETUP
Start by running the ```./start.sh``` bash script and fill out the information needed.

After the ./start.sh is done we will need to add some more configuration to have Ansible up and running correctly.
Open up ```WEB/backend/ansible/ztp_inventory.yml``` and add the dhcp range that the ZTP switches will be given from the DHCP server container. Now we need to add all ip addresses/ ranges for all cisco switches in the network to **all_switches**.This will be used by the WEB container to backup the configuration.

Now we need to add credentials for PRISCO to use when jumping to each host and backing up the configuration. This is done in: ```WEB/backend/ansible/group_vars/all_switches.yml```

When Prisco is comfy and configured we can now start all containers by running the following command from the ZTP-Cisco folder:
```docker-compose build; docker-compose up -d```

**Make sure to have the following ports open:**
- WEB GUI and API is hosted on port 80 with uvicorn
- DHCP uses port 67 and 68
- TFTP Server uses 69
