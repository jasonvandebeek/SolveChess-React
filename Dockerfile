FROM node:18-alpine as builder
WORKDIR /wrkdir

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /wrkdir
COPY --from=builder /wrkdir/package.json ./package.json
COPY --from=builder /wrkdir/node_modules ./node_modules
COPY --from=builder /wrkdir/.next ./.next
COPY --from=builder /wrkdir/public ./public
EXPOSE 3000
ENTRYPOINT ["npm", "start"]