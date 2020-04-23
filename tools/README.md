# xls2json
##运行前准备
1. Python 2.7以上
2. 运行“转换前安装执行程序.bat”
3. 运行“运行转换程序.bat”

##Excel格式说明
1. 页签为json文件名,
2. 内容第一行为属性/变量名称
3. 第二行为字段类型，支持: int, float, long, bool, string, none
4. none类型将不做转换
5. 内容留空时将根据类型写入默认值，上述类型分别对应: 0, 0.0, 0, false, ""
6. 页签名字为Sheet或者None_开头时不转换

##其他说明
1. xls2json.py需要与excel文件目录同级
2. 更改读取路径修改start函数中的path变量
```
def start():
    path = "./"
    ...
```
3. excel同级目录会生成file.list文件，为该目录下转换的文件清单

