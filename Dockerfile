# Step 1: Build the React/Vite app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use Nginx to serve the static files
FROM nginx:stable-alpine
# Copy the build output from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Create a config to make Nginx listen on port 8080 (Cloud Run requirement)
RUN echo 'server { listen 8080; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
