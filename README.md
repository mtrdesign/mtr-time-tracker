# Time Tracking Application #

## About ##

## Requirements ##

## Getting started ##

## Installation ##

1. vagrant up
2. vagrant ssh
3. vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ sudo apt-get install dos2unix
4. vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ dos2unix bootstrap.sh
5. vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ cd /srv/project/vmachines/vagrant
6. vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ ./bootstrap.sh all
7. exit
8. creating /rest/rest/env/local.py file with content:
from ..setting import *

DATABASES = {    
	'default': {        
		'ENGINE': 'django.db.backends.mysql',
		'NAME': 'mtr-time-tracker',
		'USER': 'root',
		'PASSWORD': 'parola',
		'HOST': '',
		'PORT': '',
	} 
}
9. vagrant ssh
10. vagrant@mtr-time-tracker:/srv/project/$ pip install -r requirements.txt
11. vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ mysql -u root -p
12. create database `mtr-time-tracker`;
13. vagrant@mtr-time-tracker:/srv/project/rest/rest/$
14. vagrant@mtr-time-tracker:/srv/project/rest$ python manage.py migrate --settings=rest.env.local
15. vagrant@mtr-time-tracker:/srv/project/rest$ python manage.py createsuperuser --settings=rest.env.local
16. vagrant@mtr-time-tracker:/srv/project/rest$ python manage.py runserver 0:8000 --settings=rest.env.local
17. navigate to the webapp folder and run npm install
18. then run npm run bower install
19. tsc -w
