"""
WSGI config for rest project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rest.env.local")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
proj_path = lambda x: os.path.abspath(os.path.join(BASE_DIR, x))

activate_this = proj_path('../../mtr-time-tracker-venv/bin/activate_this.py')
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

application = get_wsgi_application()
