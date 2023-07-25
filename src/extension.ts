import * as vscode from "vscode";
import * as statusBarItem from "./statusBarItem";
import { parseUIJson } from "./uiJson";

export async function activate(context: vscode.ExtensionContext) {
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