# Stage 1: Build the React application
FROM node:17-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .

# Create the app directory
RUN mkdir /src
COPY ./src/data.json ./src/data.json

# Building the app
RUN npm run build

# # Adding the express server to serve the API
# COPY server.js .
# RUN ls /app  
# RUN npm install express

# # Running the server
# CMD ["node", "server.js"]

# Stage 2: Serve using Nginx
FROM nginx:1.21-alpine as serve

# Copying the built files from the first stage
COPY --from=build /app/build /usr/share/nginx/html

# Configuring Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
