# koa2

[![Build Status](https://travis-ci.org/HerryLo/koa-mongoDB.svg?branch=master)](https://travis-ci.org/HerryLo/koa-mongoDB)
  
  个人项目，采用koa2路由框架，mongodb作为数据库，Es6/7语法编写，babel编译ES语法。
  
  前后端分离，[后台管理系统](https://github.com/HerryLo/vue-Bam), [Koa后端](https://github.com/HerryLo/koa-mongoDB)

## 技术栈
使用koa+mongoose 开发;

* 使用koa2.0作为开发框架
* mongoose作为数据库，保存数据
* 使用jwt进行token的生成和校验
* 通过Es6语法进行项目编写
* 文件结构采用MC拆分
* babel-register编译Es6/7/8
* esLint语法规则

## 调试运行
```
$ npm install 

<!-- 需要开启mongoDB数据库，不然直接报错 -->
$ mongod  //开启mongoDB

$ npm run dev //本地测试服务
```

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
|  |   └── CommentModel.js        评论模型
|  |—— mongoose                   数据库方法暴露
|  |—— public                     静态资源目录
|  |—— router                     路由文件
|  |   |—— index.js               路由
|  |   |—— api.js                 api路由
|  |   └── user.js                user路由
|  |—— utils                      公共方法
|  |—— app.js                     app入口文件
```

<<<<<<< HEAD
## 调试运行
```
$ npm install 

<!-- 需要开启管理权限设置 -->
$ mongod  //开启mongoDB

$ npm run dev //本地测试服务
```

=======
>>>>>>> 12857cb99b1e2c23b66df7efcaa2b79fb5951f4d
## API接口
  [后端 接口文档](https://github.com/HerryLo/koa-mongoDB/wiki/API-%E6%8E%A5%E5%8F%A3)
