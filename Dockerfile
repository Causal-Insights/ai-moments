FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf && \
    chmod -R a+r /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
