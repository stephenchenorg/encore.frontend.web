ARG NODE_VERSION=18.16.1

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

#ENV NODE_ENV=production

WORKDIR /app

# ---
# Build stage
FROM base as build

COPY package.json .
COPY yarn.lock .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . .

RUN yarn build

# ---
# Run stage
FROM base

ENV PORT=$PORT

# copy only the files needed to run the app
COPY --from=build /app/.output /app/.output

CMD [ "node", ".output/server/index.mjs" ]

