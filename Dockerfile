# Stage 1 - the build process
FROM node:16.0.0 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN NODE_OPTIONS=--max_old_space_size=3072 yarn
COPY . ./
RUN REACT_APP_API_SERVICE_URI=http://samehost.com NODE_OPTIONS=--max_old_space_size=3072 yarn build

# Stage 2 - the production environment
FROM nginx:1.21.6-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

