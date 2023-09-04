#!/bin/bash

echo 'COMMAND ------------------------------ Service Docker Start'
service docker start

echo 'COMMAND ------------------------------ cd /opt/nik/nikBack'
cd /opt/nik/nikBack

echo 'COMMAND ------------------------------ git checkout master'
sudo git config --system http.sslVerify false
sudo git config --system user.email 'jonathan.arroyave@grupokonecta.com'
git checkout dev

echo 'COMMAND ------------------------------ docker-compose down'
docker-compose down

echo 'COMMAND ------------------------------ docker rmi -f node_v1'
docker rmi -f node_v1

echo 'COMMAND ------------------------------ git config --global http.sslVerify false'
git config --global http.sslVerify false

echo 'COMMAND ------------------------------ cd /opt/nik/'
cd /opt/nik/

echo 'COMMAND ------------------------------ git pull origin master'
git pull origin master 

echo 'COMMAND ------------------------------ cd /opt/nik/nikBack'
cd /opt/nik/nikBack

echo 'COMMAND ------------------------------ docker build -t node_v1 .'
docker build -t node_v1 .

docker-compose up -d --scale web=2
