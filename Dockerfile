FROM node:18-alpine as builder
WORKDIR /wrkdir

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /wrkdir
COPY --from=builder /wrkdir/package.json .
COPY --from=builder /wrkdir/package-lock.json .
COPY --from=builder /wrkdir/next.config.js ./
COPY --from=builder /wrkdir/public ./public
COPY --from=builder /wrkdir/.next/standalone ./
COPY --from=builder /wrkdir/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]