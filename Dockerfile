# copy parent image from https://hub.docker.com/_/node with a version that matches your local node version
FROM node:18.9.0

# sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it
WORKDIR /usr/src/face-detection-app-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]