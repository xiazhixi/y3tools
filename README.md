# y3tools README

用于英雄三国（Y3）编辑器的工具集合插件
主要服务于 y3 地图的混合模式（ECA + lua）开发

## 功能

1. 将 y3 地图中 ui 相关的 json 配置文件转换为 lua 表

## 使用方式

点击底部状态栏的 y3tools 图标，选择`转换UI Json`，即可将当前地图中的 ui 相关的json配置文件转换为 lua 表，生成的文件在`script/y3toolsJson`文件夹中

## TODO

- [ ] 发布插件至 vscode 插件市场
- [ ] 支持 json 转换为 lua 表的规则自定义
- [ ] 支持将表格管理器的表格转换为 lua 表
- [ ] 支持直接启动 y3 编辑器
- [ ] 支持将 ui.lua 反向转换为 json
- [ ] 支持将 table.lua 转换为表格管理器的表格


## 更新日志

### 0.0.5

- [fix]修复`ui.lua`中，表名生成错误的问题

### 0.0.4

- [cfg]增加插件图标，修改 README.md

### 0.0.3

- [fix]调整了`uiMaps.lua`中prefab的生成逻辑，修复了prefab的索引错误
- [fix]修复了无法正确处理中文pannel名字的问题以及富文本引号导致的lua导出错误

### 0.0.2

- [fea]`uiMaps.lua`增加`self_index`字段，用于标记当前控件在父控件中的索引，便于在`ui.lua`和`prefab.lua`中查找
- [fea]优化加载性能，使用`package.json`的`activationEvents`替代检测函数
- [fix]修复prefab在`uiMaps.lua`中生成的信息缺损和不可用的问题
- [cfg]补充开源协议

### 0.0.1

- [fea]将 y3 地图中 ui 相关的 json 配置文件转换为 lua 表

