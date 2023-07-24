import * as vscode from "vscode";
import { FILE_PATH } from "./config";
const fs = require("fs");

export async function saveFile(
  fileContent: string,
  fileName: string,
  mode: string = "cover",
  path?: string
) {
  const workspaceRoot = `${vscode.workspace.workspaceFolders[0].uri.fsPath}${path || FILE_PATH
    }`; // 获取当前工作区根目录
  const filePath = `${workspaceRoot}/${fileName}`; // 文件路径
  try {
    fs.accessSync(workspaceRoot, fs.constants.F_OK);
  } catch (error) {
    if (error) {
      // 目录不存在，创建它
      fs.mkdirSync(workspaceRoot, { recursive: true });
    }
  }
  let originContent = "";
  if (mode === "append") {
    try {
      originContent = fs.readFileSync(filePath, "utf8") || "";
    } catch (e) { }
    fileContent = mergeStrings(originContent, fileContent);
  }

  // 将文本内容写入文件
  fs.writeFileSync(filePath, fileContent, "utf8");
}

export function mergeStrings(origin: string, next: string): string {
  let updatedOrigin = origin;
  next
    .split("/}s*\n/")
    .filter((content) => {
      return content.length > 1;
    })
    .forEach((item) => {
      const name = item.split("=")[0].trim();
      const reg = new RegExp(`${name} = {[\\s\\S]*?}\n`, "g");
      if (reg.test(updatedOrigin)) {
        updatedOrigin = updatedOrigin.replace(reg, `${item}`);
      } else {
        const fix =
          updatedOrigin[updatedOrigin.length - 1] === "\n" ||
            updatedOrigin === ""
            ? ""
            : "\n";
        updatedOrigin += `${fix}${item}`;
      }
    });
  return updatedOrigin;
}
