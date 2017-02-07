FROM nginx:alpine
EXPOSE 80
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
RUN /bin/ash -c 'rm /etc/nginx/conf.d/default.conf'