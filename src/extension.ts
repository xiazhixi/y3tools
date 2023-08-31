import * as vscode from "vscode";
import * as statusBarItem from "./view/statusBarItem";

export async function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "y3tools.showCommands",
    statusBarItem.listCommands
  );
  context.subscriptions.push(disposable);
  statusBarItem.activate(context);
}

export function deactivate() {
  statusBarItem.deactivate();
}