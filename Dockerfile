ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV NODE_ENV production

run mkdir /squad-app
WORKDIR /squad-app

RUN npm install -g nodemon

COPY package.json package.json
RUN npm install && mv node_modules /node_modules
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
#RUN --mount=type=bind,source=package.json,target=package.json \
#    --mount=type=bind,source=package-lock.json,target=package-lock.json \
#    --mount=type=cache,target=/root/.npm \
#    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE $APP_PORT

LABEL maintainer="David Gardner <david_lng8@yahoo.com>"

# Run the application.
CMD npm start
