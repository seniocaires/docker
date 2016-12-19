Run Rancher Server
```shell
docker run --name rancher-server -d --restart=unless-stopped rancher/server
```

Create CERTS
```shell
docker run --rm -e COMMON_NAME=meudominio.com.br -e KEY_NAME=meudominio.com.br -v $PWD/certs:/certs seniocaires/openssl
```

Edit files/localhost.conf -> apply yourdomain

Build image rancher_nginx
```shell
docker build -f Dockerfile-nginx -t rancher_nginx .
```

Run nginx container
```shell
docker run -d -p 80:80 -p 443:443 --link rancher-server:rancher-server --name nginx rancher_nginx
```
