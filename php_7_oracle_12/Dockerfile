FROM ubuntu:xenial

ADD files /tmp/files

RUN apt update \
    && apt install -y apache2 zip \
    && apt-get install -y php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0 php7.0-mbstring libapache2-mod-php7.0 php7.0-ldap php-xdebug wget \
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
    && rm -rf /tmp/files \
    && echo "deb-src http://archive.ubuntu.com/ubuntu/ xenial main restricted" >> /etc/apt/sources.list \
    && echo "deb-src http://archive.ubuntu.com/ubuntu/ xenial-updates main restricted" >> /etc/apt/sources.list \
    && echo "deb-src http://archive.ubuntu.com/ubuntu/ xenial multiverse" >> /etc/apt/sources.list \
    && echo "deb-src http://archive.ubuntu.com/ubuntu/ xenial-updates multiverse" >> /etc/apt/sources.list \
    && echo "deb-src http://archive.ubuntu.com/ubuntu/ xenial-backports main restricted universe multiverse" >> /etc/apt/sources.list \
    && echo "deb-src http://security.ubuntu.com/ubuntu/ xenial-security main restricted" >> /etc/apt/sources.list \
    && apt-get update && apt install -y dpkg-dev \
    && gpg --keyserver keyserver.ubuntu.com --recv-keys A744BE93 \
    && gpg --no-default-keyring -a --export A744BE93 | gpg --no-default-keyring --keyring ~/.gnupg/trustedkeys.gpg --import - \
    && chmod 777 /var/cache/apt/archives/partial/ \
    && chown _apt /var/cache/apt/archives/partial \
    && mkdir /opt/php7 && cd /opt/php7 && apt-get source -y php7.0 && export ORACLE_HOME=/usr/lib/oracle/12.2/client64 \
    && cd /opt/php7/php7.0-7.0.15/ext/pdo_oci && phpize && ./configure \
    && cp /usr/include/oracle/12.2/client64/oci.h include/oci.h \
    && cp /usr/include/oracle/12.2/client64/oratypes.h include/oratypes.h \
    && cp /usr/include/oracle/12.2/client64/ocidfn.h include/ocidfn.h \
    && cp /usr/include/oracle/12.2/client64/oci1.h include/oci1.h \
    && cp /usr/include/oracle/12.2/client64/oro.h include/oro.h \
    && cp /usr/include/oracle/12.2/client64/ori.h include/ori.h \
    && cp /usr/include/oracle/12.2/client64/ort.h include/ort.h \
    && cp /usr/include/oracle/12.2/client64/orl.h include/orl.h \
    && cp /usr/include/oracle/12.2/client64/ociextp.h include/ociextp.h \
    && cp /usr/include/oracle/12.2/client64/ociapr.h include/ociapr.h \
    && cp /usr/include/oracle/12.2/client64/ociap.h include/ociap.h \
    && cp /usr/include/oracle/12.2/client64/nzt.h include/nzt.h \
    && cp /usr/include/oracle/12.2/client64/nzerror.h include/nzerror.h \
    && cp /usr/include/oracle/12.2/client64/ocixmldb.h include/ocixmldb.h \
    && cp /usr/include/oracle/12.2/client64/oci8dp.h include/oci8dp.h \
    && cp /usr/include/oracle/12.2/client64/ocixstream.h include/ocixstream.h \
    && make && printf "\n" | make test \
    && cp /opt/php7/php7.0-7.0.15/ext/pdo_oci/modules/pdo_oci.so /usr/lib/php/20151012/ \
    && echo "; configuration for php pdo_oci module" > /etc/php/7.0/mods-available/pdo_oci.ini \
    && echo "extension=pdo_oci.so" >> /etc/php/7.0/mods-available/pdo_oci.ini \
    && phpenmod pdo_oci && a2enmod rewrite \
    && wget https://phar.phpunit.de/phpunit.phar && chmod +x phpunit.phar && mv phpunit.phar /usr/local/bin/phpunit

ADD 000-default.conf /etc/apache2/sites-enabled/000-default.conf

ENTRYPOINT ["/bin/bash", "-c", "service apache2 restart && tail -f /dev/null"]
