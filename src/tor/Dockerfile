FROM jess/tor:latest

USER root

RUN mkdir -p /var/lib/tor/hidden_service && \
    chown -R root:root /var/lib/tor && \
    chmod -R 700 /var/lib/tor

COPY tor_service/torrc /etc/torrc

COPY tor_service/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]