// 读取文件
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import { jsObjectToLuaPretty } from "json_to_lua";
import { Pannel, Prefab, PrefabElement, UIElement } from "./@types/ui";
const fs = require("fs");
const path = require("path");

function decodeUnicode(str: string) {
    return str.replace(/\\u([\dA-Fa-f]{4})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    });
}

type Parent = {
    name: string;
    path: string;
    uid?: string;
    top?: boolean;
    type: 'pannel' | 'prefab' | 'ui'
};

const covertData = (json: Pannel
    | UIElement | PrefabElement, parentInfo?: Parent, index?: number) => {
    const result: any = { ...json };
    const base = parentInfo?.path ? parentInfo.path + '.' : '';
    const path = base + result.name;
    const parent = parentInfo;
    for (const key in json) {
        const value = json[key];
        if (value?.__tuple__) {
            json[key] = value.items;
        } else if (key === 'children') {
            let index = 0;
            for (const child of value) {
                index += 1;
                covertData(child, { name: result.name, path, uid: result.uid, type: !parentInfo ? 'pannel' : 'ui' }, index);
            }
        }
    }
    uiMaps[result.uid || result.prefab_key || path || result.name] = {
        name: result.name,
        path: path,
        self_index: index,
        parent
    };
    return result;
};
const uiJson = {};
const prefabJson = {};
const uiMaps = {};

// 读取工作目录 ui 文件夹下的所有 json 文件
async function readUIJson() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return;
    }
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const dirPath = `${workspaceRoot}/ui`;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        if (file.endsWith(".json")) {
            const filePath = path.join(dirPath, file);
            const data = fs.readFileSync(filePath, "utf8");
            const json = JSON.parse(decodeUnicode(data));
            const name = `${file}`.replace('.json', '');
            if (name !== 'ui_config') {
                uiJson[name] = covertData(json as Pannel);
            } else {
                for (const key in (json as Prefab).prefab_data) {
                    const value = json.prefab_data[key];
                    prefabJson[key] = covertData(value.data as Pannel, {
                        type: 'prefab',
                        uid: key,
                        name: value.name || value.prefab_key,
                        path: ''
                    });
                }
            }
        }
    }
}

export async function parseUIJson() {
    await readUIJson();
    let uiJsonLua = '';
    let outString = 'return {\n';
    for (const key in uiJson) {
        uiJsonLua += `local ${key} = ${jsObjectToLuaPretty(uiJson[key])}\n`;
        const json = uiJson[key];
        const lua = jsObjectToLuaPretty(json);
        outString += `    ${key} = ${key},\n`;
    }
    uiJsonLua += outString + '}\n';
    // 写入文件至 script/y3toolsJson/ui.lua
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return;
    }
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const dirPath = `${workspaceRoot}/script/y3toolsJson`;
    // 如果文件夹不存在则创建
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    // 写入文件
    let filePath = path.join(dirPath, 'ui.lua');
    fs.writeFileSync(filePath, uiJsonLua);
    // 写入 prefab
    let prefabLua = `local prefab = ${jsObjectToLuaPretty(prefabJson)}
return prefab;`;
    filePath = path.join(dirPath, 'prefab.lua');
    fs.writeFileSync(filePath, prefabLua);
    let uiMapsLua = `local uiMaps = ${jsObjectToLuaPretty(uiMaps)}
return uiMaps;`;
    filePath = path.join(dirPath, 'uiMaps.lua');
    fs.writeFileSync(filePath, uiMapsLua);
}