FROM ubuntu:xenial

ADD files /tmp/files

RUN apt update \
    && apt install -y apache2 zip \
    && apt-get install -y php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0 libapache2-mod-php7.0 \
    && echo "<?php phpinfo() ?>" > /var/www/html/info.php \
    && apt install -y php7.0-dev build-essential php-pear libaio1 \
    && apt install -y alien \
    && cd /tmp/files && cat oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.zip.* > /tmp/files/oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.zip \
    && unzip oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.zip \
    && cd /tmp/files && alien oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm \
    && cd /tmp/files && alien oracle-instantclient12.2-devel-12.2.0.1.0-1.x86_64.rpm \
    && cd /tmp/files && dpkg -i oracle-instantclient12.2-basic_12.2.0.1.0-2_amd64.deb \
    && cd /tmp/files && dpkg -i oracle-instantclient12.2-devel_12.2.0.1.0-2_amd64.deb \
    && printf "\n" | pecl install oci8 \
    && echo "extension=oci8.so" >> /etc/php/7.0/mods-available/oci8.ini \
    && cd /etc/php/7.0/apache2/conf.d && ln -s /etc/php/7.0/mods-available/oci8.ini oci8.ini \
    && cd /etc/php/7.0/cli/conf.d && ln -s /etc/php/7.0/mods-available/oci8.ini oci8.ini \
    && mkdir -p /usr/share/oracle/12.2/client64/network/admin \
    && echo " " >> /usr/share/oracle/12.2/client64/network/admin/tnsnames.ora \
    && echo " " >> /usr/share/oracle/12.2/client64/network/admin/sqlnet.ora \
    && export ORACLE_HOME=/usr/lib/oracle/12.2/client64 \
    && export TNS_ADMIN=/usr/share/oracle/12.2/client64/network/admin \
    && export LD_LIBRARY_PATH=/usr/lib/oracle/12.2/client64/lib/ \
    && rm -rf /tmp/files

ENTRYPOINT ["/bin/bash", "-c", "service apache2 restart && tail -f /dev/null"]
