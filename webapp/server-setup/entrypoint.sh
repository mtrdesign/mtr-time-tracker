#!/bin/sh

ng build --target=production
cd dist && python -m SimpleHTTPServer 4200

#ng serve --host 0.0.0.0 --port 4200 --disable-host-check
