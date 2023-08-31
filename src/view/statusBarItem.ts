import * as vscode from 'vscode';
import controller from '../controller';
import { MENU_LIST } from '../config';

let y3toolsStatusBarItem: vscode.StatusBarItem;

export async function listCommands() {
  const items: vscode.QuickPickItem[] = Object.keys(MENU_LIST).map((key) => {
    return { label: MENU_LIST[key] };
  });
  const selectedItem = await vscode.window.showQuickPick(items, {
    placeHolder: "选择一个操作",
  });
  if (selectedItem) {
    await controller(selectedItem.label);
  }
}

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