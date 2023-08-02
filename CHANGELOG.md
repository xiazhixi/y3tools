# Change Log

y3tools 的更新日志

## 0.0.3

- [fix]调整了`uiMaps.lua`中prefab的生成逻辑，修复了prefab的索引错误
- [fix]修复了无法正确处理中文pannel名字的问题以及富文本引号导致的lua导出错误

## 0.0.2

- [fea]`uiMaps.lua`增加`self_index`字段，用于标记当前控件在父控件中的索引，便于在`ui.lua`和`prefab.lua`中查找
- [fea]优化加载性能，使用`package.json`的`activationEvents`替代检测函数
- [fix]修复prefab在`uiMaps.lua`中生成的信息缺损和不可用的问题
- [cfg]补充开源协议

## 0.0.1

- [fea]将 y3 地图中 ui 相关的 json 配置文件转换为 lua 表

