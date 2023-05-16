FROM node:16-alpine

RUN apk update && \
    apk add curl && \
    apk add vim && \
    apk add git 

RUN mkdir -p /opt/app/backend-vtex
COPY ./backend-vtex /opt/app/backend-vtex
RUN cd /opt/app/backend-vtex && yarn install --pure-lockfile
RUN cd /opt/app/backend-vtex && yarn build
WORKDIR /opt/app/backend-vtex
CMD ["npm", "start"]

EXPOSE 5420
