FROM node:16.15.1

WORKDIR /opt/nik/nikBack
COPY . .

RUN npm install --quiet
RUN npm run build --quiet

CMD ["node","/opt/nik/nikBack/dist/main.js"]

