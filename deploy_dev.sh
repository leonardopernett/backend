#!/bin/bash

service docker start
cd /opt/nik/nikBack
git checkout master
sudo git config --system http.sslVerify false
sudo git config --system user.email 'jonathan.arroyave@grupokonecta.com'
docker-compose down
docker rmi -f node_v1
git config --global http.sslVerify false
cd /opt/nik/
git pull origin master
cd /opt/nik/nikBack
docker build -t node_v1 .
docker-compose up -d --scale web=2
