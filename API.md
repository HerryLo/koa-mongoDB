# koa-mongoDB 接口文档

## 目录：

[1.创建文章](#1创建文章)<br/>
[2.文章列表](#2文章列表)<br/>
[2.用户列表](#3用户列表)<br/>

## 接口列表：

### 1.创建文章

示例接口
``` http://localhost:12345/api/createArticle```

#### 请求方式 ```POST```

#### 参数类型: param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|content      |Y       |String   |内容 |
|title        |Y       |String   |标题 |
|oneNumber    |Y       |String   |查看人数 |
|file         |Y       |fromDtaa |图片 |
|desc         |Y       |String   |描述 |
|tag          |Y        |Array    |标签 |
|userId       |Y        |string   |用户ID|

### 2.文章列表

示例接口
``` http://localhost:12345/api/articlelist```

#### 请求方式 ```GET```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |N      |String   |用户ID|

### 3.用户列表

#### 请求方式 ```GET```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |N      |String   |用户ID|