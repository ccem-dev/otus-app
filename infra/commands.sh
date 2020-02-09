#!/bin/sh
set -e

envsubst '${API_URL} ${PREVIEW_ADDRESS}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf-updated
rm -rf /etc/nginx/conf.d/default.conf
mv /etc/nginx/conf.d/default.conf-updated /etc/nginx/conf.d/default.conf
exit 0;
