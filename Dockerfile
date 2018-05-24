FROM node:8

# DEBUG
RUN set -ex

#Install Latex
#RUN apt-get update && apt-get install texlive-latex-base texlive-latex-extra texlive-latex-recommended texlive-base texlive-science texlive-xetex texlive-lang-italian texlive-lang-english -y

### In Dockerfile:
RUN npm i -g nodemon

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp &&\
    npm install &&\
    mkdir -p /app &&\
    cp -r /tmp/node_modules /app &&\
    rm -rf /tmp/*

WORKDIR /app

EXPOSE 80

ENV NODE_ENV=development

CMD [ "nodemon", "/app/personal-app/bin/www" ]

