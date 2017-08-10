#!/bin/sh
python3 ./manage.py migrate --settings=rest.env.local
python3 ./manage.py collectstatic --noinput
gunicorn -c gunicornconf.py rest.wsgi:application --env DJANGO_SETTINGS_MODULE="rest.env.local"