# 项目介绍

本项目是vscode插件开发的demo讲解，初学者可以参考这些demo。

作者：[**knighthood2001**](https://github.com/Knighthood2001)

> 我为啥想写这个教程：
1. 我之前也写过vscode插件，但是当时是用的github上别人的插件项目，然后进行修改的，我自己对这方面并不熟悉。
2. 工欲善其事必先利其器，大家写代码，都会用到代码编辑器，如果你能够将你经常用到的东西，写成插件，自己使用，能够节省很多时间。
3. **作为小白，我能够感受到初学者的痛苦，比如，如何才能在资源管理器中，对文件/文件夹右键，弹出指定的插件功能。**

当然，原因还有很多很多，由于自己的水平有限，自己写的教程，并不一定会很多，但是，我确实会尽量的去完善，当然，如果你有更好的想法，欢迎提出来。

# 主要内容

这里面很重要的一点就是这个`package.json`文件，如果这里面设置的不是很对，插件就不能完全正确的显示出来。

这里的内容是小茗同学写的，我抄过来的。写的很详细。
```shell
{
	// 插件的名字，应全部小写，不能有空格
    "name": "vscode-plugin-study",
	// 插件的友好显示名称，用于显示在应用市场，支持中文
    "displayName": "VSCode插件学习",
	// 描述
    "description": "VSCode插件demo集锦",
	// 关键字，用于应用市场搜索
    "keywords": ["vscode", "plugin"],
	// 版本号
    "version": "1.0.0",
	// 发布者，如果要发布到应用市场的话，这个名字必须与发布者一致
    "publisher": "knighthood2001",
	// 表示插件最低支持的vscode版本
    "engines": {
        "vscode": "^1.27.0"
    },
	// 插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
    "categories": [
        "Other"
    ],
	// 插件图标，至少128x128像素
    "icon": "images/icon.png",
	// 扩展的激活事件数组，可以被哪些事件激活扩展
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
	// 插件的主入口
    "main": "./src/extension",
	// 贡献点，整个插件最重要最多的配置项
    "contributes": {
		// 插件配置项
		"configuration": {
            "type": "object",
			// 配置项标题，会显示在vscode的设置页
            "title": "vscode-plugin-demo",
            "properties": {
				// 这里我随便写了2个设置，配置你的昵称
                "vscodePluginDemo.yourName": {
                    "type": "string",
                    "default": "guest",
                    "description": "你的名字"
                },
				// 是否在启动时显示提示
                "vscodePluginDemo.showTip": {
                    "type": "boolean",
                    "default": true,
                    "description": "是否在每次启动时显示欢迎提示！"
                }
            }
        },
		// 命令
        "commands": [
            {
                "command": "extension.sayHello",
                "title": "Hello World"
            }
        ],
		// 快捷键绑定
        "keybindings": [
            {
                "command": "extension.sayHello",
                "key": "ctrl+f10",
                "mac": "cmd+f10",
                "when": "editorTextFocus"
            }
        ],
		// 菜单
        "menus": {
			// 编辑器右键菜单
            "editor/context": [
                {
					// 表示只有编辑器具有焦点时才会在菜单中出现
                    "when": "editorFocus",
                    "command": "extension.sayHello",
					// navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
                    "group": "navigation@6"
                },
                {
                    "when": "editorFocus",
                    "command": "extension.demo.getCurrentFilePath",
                    "group": "navigation@5"
                },
                {
					// 只有编辑器具有焦点，并且打开的是JS文件才会出现
                    "when": "editorFocus && resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "z_commands"
                },
                {
                    "command": "extension.demo.openWebview",
                    "group": "navigation"
                }
            ],
			// 编辑器右上角图标，不配置图片就显示文字
            "editor/title": [
                {
                    "when": "editorFocus && resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "navigation"
                }
            ],
			// 编辑器标题右键菜单
            "editor/title/context": [
                {
                    "when": "resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "navigation"
                }
            ],
			// 资源管理器右键菜单
            "explorer/context": [
                {
                    "command": "extension.demo.getCurrentFilePath",
                    "group": "navigation"
                },
                {
                    "command": "extension.demo.openWebview",
                    "group": "navigation"
                }
            ]
        },
		// 代码片段
        "snippets": [
            {
                "language": "javascript",
                "path": "./snippets/javascript.json"
            },
            {
                "language": "html",
                "path": "./snippets/html.json"
            }
        ],
		// 自定义新的activitybar图标，也就是左侧侧边栏大的图标
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "beautifulGirl",
                    "title": "美女",
                    "icon": "images/beautifulGirl.svg"
                }
            ]
        },
		// 自定义侧边栏内view的实现
        "views": {
			// 和 viewsContainers 的id对应
            "beautifulGirl": [
                {
                    "id": "beautifulGirl1",
                    "name": "国内美女"
                },
                {
                    "id": "beautifulGirl2",
                    "name": "国外美女"
                },
                {
                    "id": "beautifulGirl3",
                    "name": "人妖"
                }
            ]
        },
		// 图标主题
        "iconThemes": [
            {
                "id": "testIconTheme",
                "label": "测试图标主题",
                "path": "./theme/icon-theme.json"
            }
        ]
    },
	// 同 npm scripts
    "scripts": {
        "postinstall": "node ./node_modules/vscode/bin/install",
        "test": "node ./node_modules/vscode/bin/test"
    },
	// 开发依赖
    "devDependencies": {
        "typescript": "^2.6.1",
        "vscode": "^1.1.6",
        "eslint": "^4.11.0",
        "@types/node": "^7.0.43",
        "@types/mocha": "^2.2.42"
    },
	// 后面这几个应该不用介绍了
    "license": "SEE LICENSE IN LICENSE.txt",
    "bugs": {
        "url": "https://github.com/Knighthood2001/vscode-plugin-study/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Knighthood2001/vscode-plugin-study"
    },
	// 主页
    "homepage": "https://github.com/Knighthood2001/vscode-plugin-study/README.md"
}
```
[插件界的hello world](./插件界的hello%20world/README.md)

# 参考资料
微软VSCode插件开发官方文档：https://code.visualstudio.com/docs/extensions/overview

小茗同学：https://www.cnblogs.com/liuxianan/p/vscode-plugin-package-json.html
