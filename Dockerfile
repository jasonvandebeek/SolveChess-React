FROM node:18-alpine as builder
WORKDIR /wrkdir

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /wrkdir
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000
ENTRYPOINT ["npm", "start"]