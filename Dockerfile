#Step 1 define OS and NodeJS Enviroment
FROM node:18
#Step 2 Set working folder in container
WORKDIR /app
# Copy package.json
COPY package*.json ./
# Install project Dependency
RUN npm install -g npm@10.1.0 && npm install --force
# Copy all project
COPY . .
# Build react application
RUN npm run build
# Expose port reactapp run
EXPOSE 3000
# start react app 
CMD [ "npm", "start" ]



# # build stage
# FROM node:18 as build-stage
# WORKDIR /app
# COPY . .
# #RUN npm install
# RUN npm install -g npm@10.1.0 && npm install --force
# #RUN npm install
# #RUN npm install -g npm@9.2.0
# RUN npm run build


# # production stage
# FROM nginx:1.19-alpine as production-stage
# COPY --from=build-stage /app /usr/share/nginx/html
# COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



# Dòng lệnh đầu tiên của Dockerfile, định nghĩa images 
# build dựa trên môi trường node nào 
# Hệ điều hành (Linux) + Môi trường node


# ----------------Stage 1----------------
FROM node:16.17.1-alpine3.16 as build

# Tạo thư mục /app trong container
WORKDIR /app

# Sao chép toàn bộ các package.json và package_lock.json vào trong thư mục /app
COPY package*.json ./

# Sao chép toàn bộ các tệp (bao gồm src code) và thư mục
COPY . /app

# install các package
RUN npm install -g npm@8.15.0 && npm install --force

# Build ứng dụng ra thành tệp tĩnh ( ra folder có tên là build)
RUN npm run build


## ----------------Stage 2----------------

FROM nginx:1.23.1-alpine

# Mở cổng 80 
EXPOSE 80

COPY --from=build /app/build /usr/share/nginx/html






#COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf


# # production stage
# FROM nginx:1.19-alpine as production-stage
# COPY --from=build-stage /app /usr/share/nginx/html
# COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]