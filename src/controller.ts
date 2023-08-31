/**
 * @description: 控制器，用于处理
 */
import { parseUIJson } from "./module/uiJson";
import { parseCustomEvent } from "./module/customEventJson";
// import { parseEditorUnit } from "./module/unitJson";
import * as vscode from "vscode";
import { MENU_LIST } from "./config";

async function openFile(fileName: string) {
    const confirm = await vscode.window.showInformationMessage(
        `转换完成，是否打开\`./script/y3toolsJson/${fileName}.lua\`文件？`,
        "确定"
    );
    if (confirm) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return;
        }
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        const filePath = `${workspaceRoot}/script/y3toolsJson/${fileName}.lua`;
        const uri = vscode.Uri.file(filePath);
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc);
    }
}

export default async function (label: string) {
    switch (label) {
        case MENU_LIST.UI:
            await parseUIJson();
            await openFile("uiMaps");
            break;
        case MENU_LIST.CustomEvent:
            await parseCustomEvent();
            await openFile("customEvent");
            break;
        // case MENU_LIST.EditorUnit:
        //     await parseEditorUnit();
        //     await openFile("editorUnit");
        //     break;
    }
}