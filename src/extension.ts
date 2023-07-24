import * as vscode from "vscode";
import * as statusBarItem from "./statusBarItem";
import { parseUIJson } from "./uiJson";

// 判断当前打开的目录下根目录，是否有header.map文件
async function folderCheck() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return;
  }
  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const headerMapPath = `${workspaceRoot}/header.map`;
  const headerMapExists = await vscode.workspace.fs
    .stat(vscode.Uri.file(headerMapPath))
    .then(
      () => true,
      () => false
    );
  if (!headerMapExists) {
    console.log("当前工作目录非Y3地图目录");
    return false;
  }
  return true;
}


export async function activate(context: vscode.ExtensionContext) {
  // 判断当前打开的目录下，是否有header.map文件
  const isY3 = await folderCheck();
  if (!isY3) {
    return;
  }
  const disposable = vscode.commands.registerCommand(
    "y3tools.showCommands",
    async () => {
      const items: vscode.QuickPickItem[] = [{ label: "转换UI Json" }];
      const selectedItem = await vscode.window.showQuickPick(items, {
        placeHolder: "选择一个操作",
      });
      if (selectedItem) {
        if (selectedItem.label === "转换UI Json") {
          await parseUIJson();
          // 弹出确认窗口，点击确定，打开`./script/y3toolsJson/uiMaps.lua`
          const confirm = await vscode.window.showInformationMessage(
            "转换完成，是否打开`./script/y3toolsJson/uiMaps.lua`文件？",
            "确定"
          );
          if (confirm) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
              return;
            }
            const workspaceRoot = workspaceFolders[0].uri.fsPath;
            const filePath = `${workspaceRoot}/script/y3toolsJson/uiMaps.lua`;
            const uri = vscode.Uri.file(filePath);
            const doc = await vscode.workspace.openTextDocument(uri);
            await vscode.window.showTextDocument(doc);
          }
        }
      }
    }
  );
  context.subscriptions.push(disposable);
  statusBarItem.activate(context);
}

export function deactivate() {
  statusBarItem.deactivate();
}