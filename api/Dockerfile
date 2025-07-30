# 1. Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

# 2. Run stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
