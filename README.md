# y3tools README

用于英雄三国（Y3）编辑器的工具集合插件
主要服务于 y3 地图的混合模式（ECA + lua）开发

## 功能

1. 将 y3 地图中 ui 相关的 json 配置文件转换为 lua 表
2. 将 y3 地图中 ECA 自定义事件转换为 lua 表

## 使用方式

点击底部状态栏的 y3tools 图标，选择列表中相应的功能，即可将当前地图中的 ui 相关的json配置文件转换为 lua 表，生成的文件在`script/y3toolsJson`文件夹中

## TODO

- [ ] 发布插件至 vscode 插件市场
- [ ] 支持 json 转换为 lua 表的规则自定义
- [ ] 支持将表格管理器的表格转换为 lua 表
- [ ] 支持直接启动 y3 编辑器
- [ ] 支持将 ui.lua 反向转换为 json
- [ ] 支持将 table.lua 转换为表格管理器的表格
