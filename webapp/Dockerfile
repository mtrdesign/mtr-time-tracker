FROM node:8.9.3

RUN mkdir /webapp
WORKDIR /webapp
COPY . /webapp/

RUN chown -R node:node /usr/local/lib/node_modules
RUN chown -R node:node /usr/local/bin
RUN chown -R node:node /webapp
USER node

RUN npm install -g @angular/cli
RUN npm install
ENTRYPOINT ["./server-setup/entrypoint.sh"]

