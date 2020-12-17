#!/usr/bin/python3
from pydantic import BaseModel


class provision_cisco(BaseModel):
    target_ip_address: str
    ip_address: str
    hostname: str
