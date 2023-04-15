#!/bin/bash

# Load variables from .env file
source .env.prod

# Check if the SERVER_ADDRESS variable is set
if [[ -z "${SSH_SERVER}" ]]; then
    echo "SSH_SERVER not set in ${SOURCE_FILE} file. Exiting."
    exit 1
fi

if [[ -z "${SSH_PORT}" ]]; then
    echo "SSH_PORT not set in ${SOURCE_FILE} file. Exiting."
    exit 1
fi
# Set the source and destination for the scp command
DESTINATION_FOLDER="${SSH_SERVER}:/home/${SSH_USER}/BHL2023/backened/${SOURCE_FILE}"
echo $DESTINATION_FOLDER

# Transfer the file using scp
scp -P "${SSH_PORT}" "${SOURCE_FILE}" "${DESTINATION_FOLDER}"

ssh ${SSH_SERVER} "cd ~/BHL2023 && git pull"
ssh ${SSH_SERVER} "cd ~/BHL2023/backened && ll; docker compose up --build -d"

