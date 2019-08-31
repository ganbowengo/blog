# blog
### 项目文件结构
``` bash
---blog
    --db                // 数据库存储文件目录
    --models            // 数据库模型文件目录
    --node_modules      // node依赖
    --public            // 公共文件目录
    --routers           // 路由文件目录
    --schemas           // 数据库结构文件目录
    --schemas           // 模板视图文件目录
    --app.js            // 项目入口文件
    --package.json      // 依赖文件
```
### 启动MongoDB
mongod --dbpath={db文件路径---在电脑中的绝对路径文件夹} --port={端口号}
Navicat 添加数据库连接
app.js中配置 mongoose连接数据库