

# Time Tracking Application #

## About ##

This is a simple time tracking app written in Angular 4 and Django.

## Requirements ##

In order to run this project you'll need to have installed [Docker](https://www.docker.com/). We also suggest to use [Vagrant](https://www.vagrantup.com/) as a base.

## Setup the project ##

### Prerequisite (Optional)

1. vagrant up
2. vagrant ssh
3. cd /srv/project
4. ./vmachines/vagrant/bootstrap.sh all
4. ./vmachines/vagrant/bootstrap.sh install_docker

### Run the server

1. `cd rest`
2. Create local settings file under `rest/rest/env/local.py`
3. `docker-compose build`
4. `docker-compose up -d`
5. Open http://localhost:8888/ to interact with the REST API

### Run the client

1. `cd webapp`
2. Create local settings file under `webapp/src/environments/environment.ts`
3. `docker-compose build`
4. `docker-compose up -d`
5. Open http://localhost:4200/ to see the Angular app

## Deploy

### Configure the server

### Configure the client

1. Create prod settings file under `webapp/src/environments/environment.prod.ts`
2. ng build --target=production
3. Point your webroot to /webapp/dist/