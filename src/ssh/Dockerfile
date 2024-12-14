FROM ubuntu:latest

# Install openssh-server and clean up apt cache
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y openssh-server telnet torsocks && \
    rm -rf /var/lib/apt/lists/*

# Create the run directory for sshd
RUN mkdir -p /var/run/sshd

# Copy the entrypoint script into the image
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose SSH port
EXPOSE 22

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# By default, run SSH daemon in the foreground
CMD ["/usr/sbin/sshd", "-D"]
