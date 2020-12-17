import re
import sys
import traceback
import platform
import subprocess
import config
import ansible_runner

from io import StringIO


def get_leases():
    print("[INFO] Fetching current leases from ZTP dhcp")
    already_in_list = []
    leases_list = []
    pattern = re.compile(
        r"lease ([0-9.]+) {.*?hardware ethernet ([:a-f0-9]+);.*?}",
        re.MULTILINE | re.DOTALL,
    )

    with open("/dhcp/dhcpd.leases") as f:
        for match in reversed(list(pattern.finditer(f.read()))):
            if match.group(2) not in already_in_list:
                leases_list.append(
                    {"mac_address": match.group(2), "ip_address": match.group(1)}
                )
                already_in_list.append(match.group(2))

    print(f"[INFO] Response: {leases_list}")
    return leases_list


def ping_switch(ip_address):
    """
    Ping switch return Bool.
    """
    try:
        print("[INFO] Ping started...")

        # Check platform to support windows exec
        param = "-n" if platform.system().lower() == "windows" else "-c"

        # Build command
        command = ["ping", param, "1", ip_address]

        # Send ping via subprocess
        if subprocess.call(command) == 0:
            return True
        else:
            return False

    except Exception as error:
        print(
            f"[WARNING] error in method ping_switch {error}\n{traceback.format_exc()}"
        )
        return False


"""
#######################################
########### ANSIBLE
"""


class Capturing(list):
    """
    Class for stdout capturing
    """

    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = StringIO()
        return self

    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        del self._stringio  # free up some memory
        sys.stdout = self._stdout


def start_ansible_playbook(target_ip_address, hostname, ip_address):
    """
    Trigger ansible to run playbook.
    If successfull it will return dict:

        response_dict["ansible_output"] = ansible_output_list   # A list of Ansible stdout rows when running playbook
        response_dict["ansible_stats"] = r.stats                # Ansible stats after running playbook format {'skipped': {}, 'ok': {'localhost': 3}, 'dark': {}, 'failures': {}, 'processed': {'localhost': 1}, 'changed': {'localhost': 1}}
        response_dict["ansible_rc"] = r.rc                      # Ansible return codes

    """

    # Create dict for input variables
    my_dict = {
        "target_ip_address": target_ip_address,
        "hostname": hostname,
        "ip_address": ip_address,
    }

    # Start ansible playbook with Capturing to gather stdout and saves class object as 'output'
    with Capturing() as output:
        r = ansible_runner.run(
            private_data_dir="/etc/ansible",
            playbook=config.configuration_playobok,
            extravars=my_dict,
        )

    # Create empty string for ansible output
    ansible_output_string = ""

    for line in output:
        ansible_output_string += line + "\n"

    # Create response_dict
    response_dict = {}

    # Add keys and values to response_dict
    response_dict["ansible_output"] = ansible_output_string
    response_dict["ansible_stats"] = r.stats
    response_dict["ansible_rc"] = r.rc

    return response_dict


def validate_ansible_playbook(response_dict):
    """
    Validate if ansible playbook ran OK. Returns:
    success = Bool
    """
    if (
        "FAILED" in response_dict["ansible_output"]
        or "ERROR" in response_dict["ansible_output"]
        or "WARNING" in response_dict["ansible_output"]
    ):
        success = False
    else:
        success = True

    return success
