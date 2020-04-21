# 示例程序说明
1. 项目使用CocosCreator 2.3.3版本
2. 脚本使用JS语法

# 目录说明
```
├─resources			动态资源目录
│  ├─config			配置文件目录，可以通过tools生成json文件
│  ├─lang			国际化目录
│  └─views			预制体目录，目录按节点分层，层级为 body < dialog < window < system
│      └─window		window层级的预制体存放目录
├─scripts			脚本目录
│  ├─com			公共脚本目录, jees.js或其他第三方组件存放位置
│  ├─comp			游戏自定义组件目录
│  ├─data			自定义数据结构目录
│  ├─game			游戏脚本目录
│  └─views			场景、预制体等脚本目录	
│      ├─body
│      ├─fire
│      └─window
└─static			静态资源目录
    ├─coms			公共资源目录
    ├─fires			场景文件目录
    └─views			预制体文件目录
        ├─body
        ├─dialog
        ├─system
        └─window
```

# 项目说明
1. 导入前请先拷贝jees.js到assets/scripts/com下。
2. 如果使用jees.min.js需要在编辑器中导入为插件。

# 其他说明
参考源代码注释，不清楚的话可以加群讨论，组件补完中...

QQ群：8802330