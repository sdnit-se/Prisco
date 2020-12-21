#!/bin/bash

currentIP=$(/sbin/ifconfig -a | awk '/(cast)/ { print $2 }' | cut -d':' -f2 | head -1)
read -p "YOUR IP ADDRESS (e.g $currentIP): " -r tftpSERVERip
read -p "DHCP IP GATEWAY (e.g 10.1.1.1): " -r dhcpIPgateway
read -p "NETWORK (e.g 10.1.1.0): " -r networkIP
read -p "NETWORK MASK (e.g 255.255.255.240): " -r networkMASK
read -p "FIRST USABLE IP (e.g 10.1.1.2): " -r firstUSABLEip
read -p "LAST USABLE IP (e.g 10.1.1.12): " -r lastUSABLEip

LOOP=true

while $LOOP; do
    echo -e "\n===== DATA ====="
    echo "YOUR IP ADDRESS: $tftpSERVERip"
    echo "DHCP IP GATEWAY: $dhcpIPgateway"
    echo "NETWORK: $networkIP"
    echo "NETWORK MASK: $networkMASK"
    echo "FIRST USABLE IP: $firstUSABLEip"
    echo "LAST USABLE IP: $lastUSABLEip"
    echo "================="
    read -p "Is this correct?(Y/n):" -r answer
    if [[ $answer == *"Y"* ]]; then
        find . -type f -exec sed -i'' -e 's/'"ZTP_DHCP_GATEWAY_IP_ZTP"'/'"$dhcpIPgateway"'/g' {} +
        find . -type f -exec sed -i'' -e 's/'"ZTP_NETWORK_IP_ZTP"'/'"$networkIP"'/g' {} +
        find . -type f -exec sed -i'' -e 's/'"ZTP_NETWORK_SUBNETMASK_ZTP"'/'"$networkMASK"'/g' {} +
        find . -type f -exec sed -i'' -e 's/'"ZTP_FIRST_USEABLE_IP_ZTP"'/'"$firstUSABLEip"'/g' {} +
        find . -type f -exec sed -i'' -e 's/'"ZTP_LAST_USEABLE_IP_ZTP"'/'"$lastUSABLEip"'/g' {} +
        find . -type f -exec sed -i'' -e 's/'"ZTP_TFTP_SERVER_IP_ZTP"'/'"$tftpSERVERip"'/g' {} +
    elif [[ $answer == *"n"* ]]; then
        echo "Bye Bye..."
        LOOP=false
    else
        echo -e "\n\nHave to write Y or n....."
    fi
done
