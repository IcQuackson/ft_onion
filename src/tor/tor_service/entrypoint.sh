#!/bin/bash

# Start Tor in the background
tor -f /etc/torrc &

# Wait for the .onion hostname file to be created
echo "Waiting for the .onion hostname to be available..."
while [ ! -f /var/lib/tor/hidden_service/hostname ]; do
    sleep 1
done

# Output the hostname
echo "Hidden service is available at:"
cat /var/lib/tor/hidden_service/hostname

# Keep the container running
wait
