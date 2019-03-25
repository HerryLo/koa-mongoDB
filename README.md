# koa2


[![Build Status](https://travis-ci.org/HerryLo/koa-mongoDB.svg?branch=master)](https://travis-ci.org/HerryLo/koa-mongoDB)
![node](https://img.shields.io/badge/node-8.11.1-green.svg)
![yarn](https://img.shields.io/badge/yarn-1.12.3-green.svg)
![MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)

<p align="center">
  koa2框架，mongodb作为数据库，Es6/7语法编写，babel编译ES语法。
</p>

---

  前后端分离，[后台管理系统](https://github.com/HerryLo/vue-Bam), [Koa后端](https://github.com/HerryLo/koa-mongoDB)

  系统目前包含 文章发布管理系统、标签系统、评论系统、用户系统，四大模块

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
$ yarn install 

<!-- 需要开启mongoDB数据库，不然直接报错 -->
$ mongod  //开启mongoDB

$ npm run dev //本地测试服务
```

## server下为目录结构:
```
.
|——server
|  |—— config                     全局配置
|  |—— constant                   常量
|  |   |—— index.js               暴露全部常量
|  |   └── user.js                用户常量
|  |—— controller                 对应路由的逻辑处理
|  |   |—— article.js             文章 控制器 接口
|  |   └── comment.js             评论 控制器 接口
|  |   └── tag.js                 标签 控制器 接口
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

## 调试运行
```
$ yarn install 

<!-- 需要开启管理权限设置 -->
$ mongod  //开启mongoDB

$ npm run dev //本地测试服务
```

## API接口
  [后端 接口文档](https://github.com/HerryLo/koa-mongoDB/wiki/API-%E6%8E%A5%E5%8F%A3)

## LICENSE
[MIT](https://github.com/HerryLo/koa-mongoDB/blob/master/LICENSE)
