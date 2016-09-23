FROM seniocaires/oracle-java-8
MAINTAINER Senio Caires <seniocaires@gmail.com>

# Adicionando wildfly 10
WORKDIR /opt
RUN apt-get update
RUN apt-get install -y wget zip
RUN wget http://download.jboss.org/wildfly/10.1.0.Final/wildfly-10.1.0.Final.zip
RUN unzip wildfly-10.1.0.Final.zip
RUN rm wildfly-10.1.0.Final.zip

ENTRYPOINT ["/bin/bash", "-c", "/opt/wildfly-10.1.0.Final/bin/standalone.sh -b 0.0.0.0 && tail -f /dev/null"]

EXPOSE 8080
