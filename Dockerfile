FROM nginx
RUN rm -rf /usr/share/nginx/html/index.html
RUN rm -rf /usr/share/nginx/html/50x.html
ENV API_URL "http://localhost:51002"
ENV PREVIEW_ADDRESS "http://localhost:51001"
ENV NGINX_HOST "localhost"
ENV SOURCE_DIR "/usr/share/nginx/html/papp"
COPY source/dist/papp/. ${SOURCE_DIR}
COPY infra/nginx.conf /etc/nginx/nginx.conf
COPY infra/papp.conf /etc/nginx/conf.d/default.conf
COPY infra/commands.sh /usr/local/bin/commands.sh
RUN chmod +x /usr/local/bin/commands.sh
CMD ["/bin/sh", "-c", "/usr/local/bin/commands.sh && nginx -g 'daemon off;'"]
