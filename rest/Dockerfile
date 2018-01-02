FROM alpine:3.7

ENV RUNTIME_PACKAGES ca-certificates python3 mariadb-dev libxslt-dev libxml2-dev libressl-dev git bash udev
ENV BUILD_PACKAGES build-base python3-dev libxslt-dev libxml2-dev libffi-dev g++ make

ENV DBUS_SESSION_BUS_ADDRESS "dbus-daemon --session --fork --print-address"

WORKDIR /code
ADD . /code

RUN apk upgrade --update && apk add --no-cache $RUNTIME_PACKAGES && \
    update-ca-certificates

RUN apk --no-cache add --virtual build-dependencies $BUILD_PACKAGES && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    pip3 --no-cache-dir install -r requirements.txt && \
    apk del build-dependencies

RUN mkdir /app-logs

CMD ["./server-setup/entrypoint.sh"]