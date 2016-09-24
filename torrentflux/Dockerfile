FROM seniocaires/torrentflux:1.0.0
MAINTAINER Senio Caires <seniocaires@gmail.com>

ENTRYPOINT ["/bin/bash", "-c", "service mysql start && service apache2 restart && tail -f /dev/null"]
