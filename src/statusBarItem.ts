import * as vscode from 'vscode';

let y3toolsStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  y3toolsStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  y3toolsStatusBarItem.text = 'y3tools';
  y3toolsStatusBarItem.command = 'y3tools.showCommands';
  y3toolsStatusBarItem.show();
  context.subscriptions.push(y3toolsStatusBarItem);
}

export function deactivate() {
  if (y3toolsStatusBarItem) {
    y3toolsStatusBarItem.dispose();
  }
}