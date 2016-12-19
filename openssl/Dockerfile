FROM alpine:3.4

MAINTAINER Senio Caires <seniocaires@gmail.com>

RUN apk add --no-cache openssl
CMD /usr/bin/openssl genrsa -out /certs/${KEY_NAME}.key 1024 \
    && /usr/bin/openssl req  -new -newkey rsa:4096 -days 365 -nodes -subj "/C=/ST=/L=/O=/CN=${COMMON_NAME}" -keyout /certs/${KEY_NAME}.key -out /certs/${KEY_NAME}.csr  \
    && /usr/bin/openssl x509 -req -days 365 -in /certs/${KEY_NAME}.csr -signkey /certs/${KEY_NAME}.key -out /certs/${KEY_NAME}.crt
