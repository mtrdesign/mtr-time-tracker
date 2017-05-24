# Time Tracking Application #

## About ##

## Requirements ##

## Getting started ##

## Installation ##

1. You need to let Vagrant to create and configure the guest machine according to Vagrant file.
This is done by running the following command.

```
vagrant up
```

2. How you need to SSH into the running Vagrant guest machine.

```
vagrant ssh
```

3. After loggin into the guest machine you must install the dos2unix text file format converter
**Note:** If you are using unix like operating system you can skip this step. 

```
vagrant@mtr-time-tracker:~$ sudo apt-get install dos2unix
```

4. How you should navigate to the /srv/project/vmachines/vagrant folder where the bootstrap.sh file is located and run doc2unix command. 

```
vagrant@mtr-time-tracker:~$ cd /srv/project/vmachines/vagrant
vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ dos2unix bootstrap.sh
```

5. The next step is to execute the bootstrap.sh script to configure everything on the new machine 

```
vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ ./bootstrap.sh all
```

6. Now exit from the guest machine by using the exit command:

```
vagrant@mtr-time-tracker:/srv/project/vmachines/vagrant$ exit
```

8. The next this you should to do is navigating to the env folder in the repository and creating local.py file.

```
cd /rest/rest/env
```

Before writing your local setting in the local.py file. You should first import the settings from the settings.py file.
This can be done by adding this line of code.

```
from ..settings import *
```

9. The default database engine is sqlite3, but because we want to use the mysql database engine we must override the database settings.
Put this lines of code in the local.py file.

```
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
```

10. How let's SHH to the vagrant machine again and navigate to the /srv/project folder.

```
vagrant ssh
vagrant@mtr-time-tracker:~/$ cd /srv/project
```

11. You need to install the Python packages that are listed in the the requirements.txt file.

```
vagrant@mtr-time-tracker:/srv/project/$ pip install -r requirements.txt
```

11. Next you want to create your mysql database. To do that you must do the following things:
First login to the mysql command-line client 

```
vagrant@mtr-time-tracker:/srv/project/$ mysql -u root -p
```

Then create the database with name mtr-time-tracker.

```
mysql > create database `mtr-time-tracker`;
```

Then you can exit the mysql client by executing the exit command.

```
mysql > exit;
```

12. then navigate to the /srv/project/rest/rest folder 

```
vagrant@mtr-time-tracker:~/$ cd /srv/project/rest
```

13. Now we want to tell Django to use our local settings instead of the default settings in the settings.py file.
To do this you must migrate to the local settings.

```
vagrant@mtr-time-tracker:/srv/project/rest$ python manage.py migrate --settings=rest.env.local
```

14. We must create a super user by executing:

```
vagrant@mtr-time-tracker:/srv/project/rest$ python manage.py createsuperuser --settings=rest.env.local
```

15. Now we can run our server:

```
vagrant@mtr-time-tracker:/srv/project/rest$ python manage.py runserver 0:8000 --settings=rest.env.local
```

You should get responce like this:

```
Performing system checks...

System check identified no issues (0 silenced).
May 23, 2017 - 13:07:46
Django version 1.9.8, using settings 'rest.env.local'
Starting development server at http://0:8000/
Quit the server with CONTROL-C.
```

Now the server is running.

16. Now we need to download the npm and bower packages.
To do that we must navigate to the  webapp folder and run the following commands:

```
vagrant@mtr-time-tracker:/srv/project/rest$ cd ../webapp/
vagrant@mtr-time-tracker:/srv/project/webapp$ npm install
vagrant@mtr-time-tracker:/srv/project/webapp$ bower install
```

17. Now compile the typescript filesby running:

```
vagrant@mtr-time-tracker:/srv/project/webapp$ tsc -w
```

**Note:** -w flag is used to watch the input files.
