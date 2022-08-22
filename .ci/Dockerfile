FROM node:13.7.0-slim

WORKDIR /dependencies

ADD package.json package.json
RUN yarn install

CMD /bin/bash