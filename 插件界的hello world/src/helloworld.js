const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.helloworld', (uri) => {
        vscode.window.showInformationMessage(`hello world`);
    }));
};