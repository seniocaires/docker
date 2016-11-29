FROM node:6

MAINTAINER Senio Caires <seniocaires@gmail.com>

COPY files/client/ /tmp
COPY files/oracle-instantclient.conf /etc/ld.so.conf.d/

RUN apt-get update && \
    apt-get install -y zip libaio1 && \
    cd /tmp && \
    cat instantclient-basic-linux.x64-12.1.0.2.0.zip.* > basic.zip && \
    unzip basic.zip && \
    unzip instantclient-sdk-linux.x64-12.1.0.2.0.zip && \
    mv instantclient_12_1 instantclient && \
    mkdir /opt/oracle && \
    mv instantclient /opt/oracle && \
    cd /opt/oracle/instantclient && \
    ln -s libclntsh.so.12.1 libclntsh.so && \
    export LD_LIBRARY_PATH=/opt/oracle/instantclient:$LD_LIBRARY_PATH && \
    ldconfig && \
    rm -rf /tmp
   
