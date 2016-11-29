FROM node:6

MAINTAINER Senio Caires <seniocaires@gmail.com>

RUN mkdir /opt/oracle

COPY configuracao/instantclient-basic-linux.x64-12.1.0.2.0.zip /opt/oracle
COPY configuracao/instantclient-sdk-linux.x64-12.1.0.2.0.zip /opt/oracle

RUN apt-get update && \
    apt-get install -y zip libaio1 && \
    cd /opt/oracle && \
    unzip instantclient-basic-linux.x64-12.1.0.2.0.zip && \
    unzip instantclient-sdk-linux.x64-12.1.0.2.0.zip && \
    mv instantclient_12_1 instantclient && \
    cd instantclient && \
    ln -s libclntsh.so.12.1 libclntsh.so && \
    export LD_LIBRARY_PATH=/opt/oracle/instantclient:$LD_LIBRARY_PATH

COPY configuracao/oracle-instantclient.conf /etc/ld.so.conf.d/

RUN ldconfig
