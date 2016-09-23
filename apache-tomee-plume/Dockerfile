FROM seniocaires/oracle-java-8
MAINTAINER Senio Caires <seniocaires@gmail.com>

# Adicionando apache tomee plume
WORKDIR /opt
RUN apt-get update
RUN apt-get install -y wget zip
RUN wget https://dist.apache.org/repos/dist/release/tomee/tomee-1.7.4/apache-tomee-1.7.4-plume.zip
RUN unzip apache-tomee-1.7.4-plume.zip
RUN rm apache-tomee-1.7.4-plume.zip

ENTRYPOINT ["/bin/bash", "-c", "/opt/apache-tomee-plume-1.7.4/bin/startup.sh && tail -f /dev/null"]

EXPOSE 8080
