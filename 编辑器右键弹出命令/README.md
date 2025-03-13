# 讲解
今天来实现一个demo，就是获取当前文件的路径。

当然，这是次要的，主要的原因，是来实现一下，在编辑器中，如何通过右键，显示插件的命令。
- **注意：我这里没有将上次内容，也就是资源管理器右键弹出命令去除。**
# 实现
##  get_path.js
这里主要是获取当前文件的路径，并通过信息框的方式显示出来。
```javascript
const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.getCurrentFilePath', (uri) => {
        vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
    }));
};
```

## package.json
1. 这里的`activationEvents`字段，是用来激活插件的。这里用的是命令的方式来激活。
2. `menus`字段，是用来在资源管理器中添加右键菜单的。
    - `editor/context`表示在`编辑器`中添加右键菜单。**这一点非常重要**

```javascript
    "activationEvents": [
        "onCommand:extension.getCurrentFilePath"
    ],
    "main": "./src/extension",
    "contributes": {
      "commands": [
          {
              "command": "extension.getCurrentFilePath",
              "title": "获取当前文件(夹)路径"
          }
      ],
      "menus": {
          "editor/context": [
            {
                "command": "extension.getCurrentFilePath",
                "group": "navigation"
            }
          ]
      }
    },
```
# 运行

[编辑器右键弹出命令](../sources/video/编辑器右键显示命令.gif)