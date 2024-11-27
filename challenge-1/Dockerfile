# Get node image
FROM --platform=linux/amd64 node:23-slim AS base
RUN apt-get update && apt-get install -y busybox

# # We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true


# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /etc/apt/keyrings/linux_signing_key.pub \
  && sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/linux_signing_key.pub] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Create challenge directory
RUN mkdir /challenge && \
    chmod 700 /challenge

# Copy files to challenge directory
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json ./package.json
RUN npm install 

RUN mkdir -p ./node_modules && chown -R node:node ./node_modules
RUN mkdir -p ./src && chmod 755 ./src
RUN mkdir -p ./local && touch ./local/local.txt && chmod 777 ./local/local.txt
RUN mkdir -p ./dist && chmod 777 ./dist
COPY src ./src
COPY dist/index.html ./dist/index.html
COPY webpack.config.cjs ./webpack.config.cjs

FROM base AS challenge
ARG FLAG="picoctf{default_flag}"

# debug
RUN echo $FLAG 
RUN echo $FLAG | sed "s/.*{/picoCTF{gr3p_15_4_5up3rp0w3r_/1" >  /home/node/app/flag.txt

# (dbrumley): Was putting the flag in the download intentional?
# commented out for now. 
#RUN tar czvf /challenge/artifacts.tar.gz flag.txt && \

RUN echo "{\"flag\":\"$(cat flag.txt)\"}" > /challenge/metadata.json

USER node
EXPOSE 8000
# PUBLISH 8000 AS web

# RUN npm run start &
# RUN npm run start 


# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "start"]
