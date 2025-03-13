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
