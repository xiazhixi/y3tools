# y3tools README

用于英雄三国（Y3）编辑器的工具集合插件
主要服务于 y3 地图的混合模式（ECA + lua）开发

## 功能

1. 将 y3 地图中 ui 相关的 json 配置文件转换为 lua 表

## TODO

- [ ] 发布插件至 vscode 插件市场
- [ ] 支持 json 转换为 lua 表的规则自定义
- [ ] 支持将表格管理器的表格转换为 lua 表
- [ ] 支持直接启动 y3 编辑器
- [ ] 支持将 ui.lua 反向转换为 json
- [ ] 支持将 table.lua 转换为表格管理器的表格


## 打包插件

```bash
npm install vsce -g
vsce package
```
打包后获得 y3tools-x.x.x.vsix 文件（x.x.x 为版本号）

## 安装插件

ctrl + shift + p 打开命令面板，输入 `install from vsix`，选择插件安装即可