# 讲解
昨天的内容，我们是需要通过ctrl+shift+p打开命令面板，然后输入命令来执行。

其实还是挺麻烦的。

能不能不用在命令面板中输入命令，就能执行命令呢？答案是可以的，我们可以自己去绑定快捷键。

# 实现步骤

在`package.json`的`contributes`中添加一个`keybindings`，然后将`command`和`key`绑定即可。
```json
  "contributes": {
      "commands": [
          {
              "command": "extension.helloworld",
              "title": "hello world"
          }
      ],
      "keybindings": [
              {
                  "command": "extension.helloworld",
                  "key": "ctrl+f10",
                  "mac": "cmd+f10"
              }
      ]
  },
```
然后进行运行，直接输入`ctrl+f10`即可。


