Run Rancher Server
```shell
docker run --name rancher-server -d --restart=unless-stopped rancher/server
```

Build image rancher_nginx
```shell
docker build -f Dockerfile-nginx -t rancher_nginx .
```

Run nginx container
```shell
docker run -d -p 80:80 -p 443:443 --link rancher-server:rancher-server --name nginx rancher_nginx
```
