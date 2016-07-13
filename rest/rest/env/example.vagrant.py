from ..settings import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mtr-time-tracker',
        'USER': 'root',
        'PASSWORD': 'parola',
        'HOST': '',
        'PORT': '',
    },
}