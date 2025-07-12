FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y openssh-server telnet torsocks && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/run/sshd

RUN useradd -m -s /bin/bash alice && \
    echo 'alice:securepassword' | chpasswd

RUN mkdir -p /home/alice/.ssh && \
    chmod 700 /home/alice/.ssh

COPY authorized_keys /home/alice/.ssh/authorized_keys

RUN chown -R alice:alice /home/alice/.ssh && \
    chmod 600 /home/alice/.ssh/authorized_keys


EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
