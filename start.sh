#!/bin/bash

currentIP=$(/sbin/ifconfig -a | awk '/(cast)/ { print $2 }' | cut -d':' -f2 | head -1)
echo Your current IP seems to be $currentIP
echo
declare -a ConfigFiles=("./DHCP/data/dhcpd.conf" "./TFTP/configuration/cisco_ztp_grund.conf")
declare -a ParamNames=("ZTP_TFTP_SERVER_IP_ZTP" "ZTP_DHCP_GATEWAY_IP_ZTP" "ZTP_NETWORK_IP_ZTP" "ZTP_NETWORK_SUBNETMASK_ZTP" "ZTP_FIRST_USEABLE_IP_ZTP" "ZTP_LAST_USEABLE_IP_ZTP")
declare -a QuestionStrings=("YOUR IP ADDRESS (e.g $currentIP): " "DHCP IP GATEWAY (e.g 10.1.1.1): " "NETWORK (e.g 10.1.1.0): " "NETWORK MASK (e.g 255.255.255.240): " "FIRST USABLE IP (e.g 10.1.1.2): " "LAST USABLE IP (e.g 10.1.1.12): ")
declare -a ConfigValues

# Gather data
for q in "${QuestionStrings[@]}"; do
    echo -n $q
    read
    ConfigValues+=(${REPLY})
done

# Confirm data with user
echo
echo Your config:
for i in "${!ConfigValues[@]}"; do
    printf "%s\t%s\n" "${ParamNames[$i]}" "${ConfigValues[$i]}"
done
echo

read -p "Is this correct?(Y/n):" -r answer
echo

# Update config files
if [[ $answer == *"Y"* ]]; then
    echo Updating config files
    for f in "${ConfigFiles[@]}"; do
        echo Updating $f
        for i in "${!ConfigValues[@]}"; do
            sed -i '' 's/'"${ParamNames[$i]}"'/'"${ConfigValues[$i]}"'/g' "${ConfigFiles[@]}"
        done
    done
elif [[ $answer == *"n"* ]]; then
    echo "Bye Bye..."

else
    echo -e "\n\nHave to write Y or n....."
fi
docker logs ztp-dhcp