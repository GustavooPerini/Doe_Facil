FROM ubuntu:24.04
RUN apt-get update && apt-get upgrade -y

RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install nodejs -y
RUN npm install -g @angular/cli@16.2.16

RUN apt-get install maven openjdk-21-jdk -y

RUN mkdir /app

WORKDIR /app
