# 2016-10-7:Mongodb 数据库操作

### 1）用js代码操作mongodb
#### 我们主要基于一个JS库的帮助，Mongoose，它可以作为一个npm的包来安装。解释一下，一个JS库就是一组JS接口的集合。
![](https://raw.githubusercontent.com/happypeter/digicity-express-api/master/doc/img/002-mongoose.png)

### 2)下面我们来动手做一个 express+mongoose 的小 demo 。
#### 先写一个最简单的 express 程序
#### index.js 如下：
```
var express = require('express');
var app = express();

// 下面这个就是路由代码
app.post('/posts', function(req, res){
  console.log('hello');
});

app.listen(3000, function(){
  console.log('running on port 3000.....');
});
```
#### 相应的 curl 测试命令是
```
curl --request POST localhost:3000/posts

```
#### 如果可以在运行 node index.js 的位置看到 hello 表示我们这一步胜利完成。
![](https://raw.githubusercontent.com/happypeter/digicity-express-api/master/doc/img/003-curl.png)

### 3)安装 mongoose
#### 作为一个 npm 包进行安装，link
```
npm install --save mongoose
```
### 在 js 代码中导入 mongoose
```
var mongoose = require('mongoose');
```
### 进行数据库的连接
```
mongoose.connect('mongodb://localhost:27017/digicity-express-api');
```
#### mongoose.connect 接口用来连接我们系统上安装的 mongodb 数据库。
#### 如何定位数据库的所在位置？
* 一种逻辑上可行的方案，就是用数据存储的文件夹的位置（比如我们前面采用的 data/db 文件夹），但是实际上 Mongodb 有其他方法
* mongodb 的软件，运行起来类似一个网站，用链接来访问。（ mongodb://localhost:27017 ）

#### 但是，链接之后，要跟上具体的数据库名字。我们每次链接，都是链接到一个数据库。比如我们这里， 就是 digicity-express-api （一般与项目名同名）。
#### 如何验证链接成功呢？用下面的代码
```
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success!')
});
```
#### 看到 success 字样表示链接成功。
----

### 1定义数据的概要 Schema

#### 数据天然的具有一定的结构，比如，人员名单中，自然的会涉及姓名，年龄，籍贯等信息。 在mongodb这里，一个人员的信息会被作为一条数据来保存。所有信息的类型都会对应成字段名，由于是跟计算机打交道，每个字段类型还要涉及它的数据类型（num，string...）。

#### 那么 Schema 就是用来规定一个记录的各个字段的，字段名+数据类型的。

```
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: String,
    content: String
  }
);
```
#### 上面的代码，规定出了我们的记录能够保存哪些数据。

### 2创建数据模型 model

#### 数据库的结构是，一个数据库，里面会包含多个集合，一个集合会包含多条数据记录。
#### 那么现在，我们数据要往哪个数据库中存？这个问题以及通过前面的 mongoose.connect(xxx) 的语句指定了。
#### 但是数据要保存到哪个集合还没有指定。所有我们的 model 创建语句如下：
```
var Post = mongoose.model('Post', PostSchema);
```
#### 上面 .model() 的第一个参数，Post 就为我们指定了集合的名字，会对应数据库中的 posts 这个集合。第二个参数是数据 schema ，就是前面我们定义的。
#### 到这里，所有数据存储的基础设施全部就绪。

### 3实例化 model 得到数据对象
#### 现在我们要把实际要存储的数据，放到一个 model 的实例（对象）之中了。
```
var post = new Post({title:"myTitle", content: "myConent"})
```
### 4对象之上呼叫 save()
#### 这样可以把数据保存到数据库中。
```
post.save(function(){
  console.log('saved');
});
```
