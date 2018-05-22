# koa

目前处于开发过程中，还未部署生产环境，觉得不错的可以star下。

## 技术栈
使用koa+mongoose 开发，配合babel-register编译Es6/7。

* 使用koa作为开发框架
* mongoose作为数据库操作
* 使用jwt进行token的生成
* 通过Es6语法进行项目编写
* 文件结构采用MC拆分

## server下为目录结构:
```
.
|——server
|  |—— config                     全局配置
|  |—— controller                 对应路由的逻辑处理
|  |   |—— api.js                 api 控制器 接口
|  |   └── user.js                用户 控制器 接口
|  |—— middleware                 路由中间件
|  |—— model                      mongoose数据库模型
|  |   |—— ArticleModel.js        文章模型
|  |   |—— TagModel.js            标签模型
|  |   └── UserModel.js           用户模型
|  |—— mongoose                   数据库方法暴露
|  |—— public                     静态资源目录
|  |—— router                     路由文件
|  |   |—— index.js               路由
|  |   |—— api.js                 api路由
|  |   └── user.js                user路由
|  |—— utils                      公共方法
|  |—— app.js                     app入口文件
```

## 调试运行
```
$ npm install 

$ mongod  //开启mongoDB

$ npm run dev //本地测试服务
```

## API接口
[接口文档](https://github.com/HerryLo/koa-mongoDB/blob/master/API.md)
