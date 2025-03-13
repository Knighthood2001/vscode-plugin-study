# 讲解
这里，我改动的还是挺多的，当然，我没有做详细的测试，如果遇到一些问题，大家可以自己调试解决。

主要功能：在资源管理器中，右键文件或者指定文件，弹出命令，或者是使用快捷键，执行命令。

# 实现步骤
## get_path.js
代码也是我用AI写的，主要原因是，如果直接通过快捷键触发，uri中会没有内容，需要手动获取当前文件路径。如下面代码中的else分支，之前的代码没有这个，因此如果直接绑定快捷键，是没有用的。

```javascript
const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.getCurrentFilePath', (uri) => {
        if (uri) {
            vscode.window.showInformationMessage(`当前路径（右键触发）: ${uri.fsPath}`);
        } else {
            // 如果通过快捷键触发，需要手动获取当前文件路径
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document) {
                vscode.window.showInformationMessage(`当前文件路径（快捷键触发）: ${editor.document.fileName}`);
            } else {
                vscode.window.showWarningMessage('没有打开的文件');
            }
        }
    }));
};
```

## package.json
1. 这里面，首先是有一个命令，extension.getCurrentFilePath
2. 然后，我们给他绑定了快捷键，ctrl+f9
3. 然后，给他绑定了编辑器右键菜单，editor/context，这样你就能在编辑器中右键，在菜单中看到这个命令。
4. 此外，我们也给他在资源管理器右键菜单中绑定了，但是和之前的不一样，这里添加了条件，即如果是js文件或者文件夹，才会显示这个命令。否则，不会显示这个命令，这样的好处是，不会在所有文件上都显示这个命令，这样就不会干扰到用户。
5. 最后，我们给他绑定了激活事件，即当执行这个命令时，才会激活插件。
```json
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
      "keybindings": [
          {
              "command": "extension.getCurrentFilePath", 
              "key": "ctrl+f9",
              "mac": "cmd+f9",
              "when": "editorTextFocus"
          }
      ],
      "menus": {
          "editor/context": [
              {
                  "when": "editorFocus",
                  "command": "extension.getCurrentFilePath",
                  "group": "navigation@1"
              }
          ],
          "explorer/context": [
            {
                "when":"resourceExtname == .js || explorerResourceIsFolder",
                "command": "extension.getCurrentFilePath",
                "group": "navigation"
            }
          ]
      }
  },
```
# 运行
[运行](../source/video/文件夹和指定文件.gif)