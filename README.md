# koa

目前处于开发过程中，还未部署生产环境，觉得不错的可以star下。

使用koa+mongoose 开发，配合babel-register编译Es6/7。

* 使用koa作为开发框架
* mongoose作为数据库操作
* 使用jwt进行token的生成
* 通过Es6语法进行项目编写
* 文件结构采用MC拆分

server下为目录结构:
```
.
|——server
|  |—— config  //全局配置
|  |—— controller  //对应路由的逻辑处理
|  |   |—— api.js  //api接口
|  |   └── user.js  //用户接口
|  |—— middleware  //路由中间件
|  |   └── index.js  中间件
|  |—— model  //mongoose数据库模型
|  |—— mongoose  //数据库方法暴露
|  |—— public //静态资源目录
|  |—— router //路由文件
|  |—— utils  //公共方法
|  |—— app.js //app入口文件
```

```
$ npm install 

$ mongod  //开启mongoDB

$ npm run dev //本地测试服务
```
