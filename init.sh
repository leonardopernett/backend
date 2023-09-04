curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install node
nvm use node
sudo yum upgrade
sudo yum install git
git clone https://github.com/eliteblanca/consultameBackEnd.git
cd nikBack
npm install
npm run build
sudo yum install nginx
sudo mv ngxapp.conf /etc/nginx/conf.d/
sudo restorecon  /etc/nginx/conf.d/
sudo restorecon  /etc/nginx/conf.d/*
sudo cat /var/log/audit/audit.log | grep nginx | grep denied | audit2allow -M mynginx 
sudo semodule -i mynginx.pp
npm install pm2 -g
pm2 start dist/main.js -i max
sudo service nginx start


service nginx status


sudo systemctl reload nginx
