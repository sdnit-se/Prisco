FROM ubuntu:18.04

EXPOSE 80/tcp

RUN apt-get update && apt-get install -y \
    ansible \
    openssh-client \
    python3-pip \
    cron
RUN python3 -m pip install --upgrade pip
COPY ./requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

### CREATE FOLDERS
RUN mkdir -p /etc/ansible/ztp_configs/

### COPY STUFF TO CORRECT FOLDER
## API
COPY ./app /app

## ANSIBLE
# REMOVE ANSIBLE CONFIG
RUN rm -f /etc/ansible/ansible.cfg
# COPY FILES
COPY ./ansible /etc/ansible

## EXECUTE BACKUP OF ALL CISCO SWITCHES (EVERY SUNDAY)
RUN chmod +x /etc/ansible/cisco_backup.sh
# Give execution rights on the cron job
RUN { crontab -l; echo "0 0 * * SUN /etc/ansible/cisco_backup.sh"; } | crontab -

## Work from app
WORKDIR /app

## Start the application
RUN echo "localhost ansible_connection=local" >> /etc/ansible/hosts
CMD python3 -m uvicorn main:app --host 0.0.0.0 --port 80
