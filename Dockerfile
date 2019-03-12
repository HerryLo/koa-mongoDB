# 基于最新的 node 镜像
FROM node:8.11.1
# 修改工作目录
WORKDIR /app
# 复制当前目录下所有文件到目标镜像 /app/ 目录下
COPY . /app/
# yarn 一下，安装依赖
RUN yarn install
# 端口号
EXPOSE 12345
# 启动 node server
ENTRYPOINT ["npm", "run", "dev"]