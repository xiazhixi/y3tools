// 读取文件
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import { jsObjectToLuaPretty, makeLuaKey } from "../utils/json_to_lua";
import { Pannel, Prefab, PrefabElement, UIElement } from "../@types/ui";
import decodeUnicode from "../utils/decodeUnicode";
import { get } from "http";
const fs = require("fs");
const path = require("path");

// 读取根目录 customevent.json
async function readCustomJson() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return;
    }
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const filePath = `${workspaceRoot}/customevent.json`;
    const fileContent = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileContent);
    return json;
}

type EventGroup = {
    group: Array<Event>
    key: string
    name: string
};

type Event = {
    items: [id: number, name: string]
};

type EventParam = [name: string, type: number];

const TYPES = {
    100000: '实数',
    100001: '布尔类型',
    100002: '整数',
    100003: '字符串',
    100004: '点',
    100006: '单位',
    100009: '矩形区域',
    100010: '单位分类',
    100011: '表',
    100014: '技能',
    100020: '阵营',
    100023: '圆形区域',
    100024: '路径',
    100025: '玩家',
    100026: '单位组',
    100027: '玩家组',
    100031: '物品',
    100032: '物品类型',
    100037: '玩家属性',
    100038: '单位类型池',
    100039: '技能类型',
    100042: '单位属性',
    100046: '魔法效果类型',
    100062: '投射物类型',
    100064: '伤害类型',
    100066: '特效类型',
    100070: '界面控件',
    100072: '界面事件类型',
    100073: '镜头',
    100076: '魔法效果',
    100077: '投射物',
    100084: '声音类型',
    100115: '图片',
    100116: '单位类型',
    100134: '平台道具类型',
    100148: '特效',
    100149: '路径组',
    100150: '多边形区域',
    100171: '物品组',
    100172: '科技类型',
    100178: '动态触发器',
    100179: '玩家控制者类型',
    100180: '玩家游戏状态',
    100181: '计时器',
    100182: '技能分类',
    100191: '链接特效类型',
    100192: '对齐方式',
    100193: 'UI方向',
    100201: '随机池',
    100202: '链接特效',
    100203: '投射物组',
    100205: '可破坏物',
    100207: '可破坏物类型',
    100214: '声音',
    100219: '技能释放类型',
    100222: '曲线路径',
    100225: '角度',
    100230: '整数存档',
    100231: '字符串存档',
    100232: '实数存档',
    100233: '布尔存档',
    100235: '小地图显示模式',
    100236: '场景UI',
    100239: '时间轴动画',
    100244: '镜头动画',
    100247: '表格存档',
    100258: '指示器类型',
    100263: '运动器',
    100288: '鼠标样式',
    100295: '序列帧',
    100300: '单位属性类型',
    100301: '属性分类',
    100313: '曲线动画类型',
    100400: '攻击类型',
    100401: '护甲类型',
    100505: '游戏模式',
    100506: '画质',
    100507: '窗口类别',
    200220: '键盘按键',
    1001550: '点光源',
    1001552: '聚光灯',
    1001554: '局部雾',
    1001556: '界面组件类型',
    1001558: '界面组件',
    1001559: '界面组件（预设）',
    1001560: '语音频道'
};

function getEventData(event: Event, conf: any) {
    const { items } = event;
    const id = items[0];
    const name = decodeUnicode(items[1]);
    const paramsConf = conf[id];
    const params = {};
    paramsConf.map((param: EventParam) => {
        params[decodeUnicode(param[0])] = param[1];
    });
    return { id, name, params };
};


export async function parseCustomEvent() {
    const { group_info, conf } = await readCustomJson();
    const eventList = {};
    const eventMap = {};

    group_info.map((data: EventGroup | Event) => {
        if (data["group"]) {
            const groupName = decodeUnicode(data["name"]);
            if (!eventMap[groupName]) {
                eventMap[groupName] = {};
            }
            data["group"].map((item: Event) => {
                const result = getEventData(item, conf);
                eventList[result.id] = result.params;
                eventMap[groupName][result.name] = result.id;
            });
        } else if (data["items"]) {
            const result = getEventData(data as Event, conf);
            eventList[result.id] = result.params;
            eventMap[result.name] = result.id;
        }
    });

    let eventJson = 'local CUSTOM_EVENT = ';
    eventJson += jsObjectToLuaPretty(eventList);
    eventJson += '\n';

    eventJson += 'local CUSTOM_EVENT_MAP = ';
    eventJson += jsObjectToLuaPretty(eventMap);
    eventJson += '\n';
    // eventJson += 'local EVENT_TYPES = ';
    // eventJson += jsObjectToLuaPretty(TYPES);
    // eventJson += '\n';
    // eventJson += '\nreturn { CUSTOM_EVENT = CUSTOM_EVENT, CUSTOM_EVENT_MAP = CUSTOM_EVENT_MAP, EVENT_TYPES = EVENT_TYPES }';
    eventJson += '\nreturn { CUSTOM_EVENT = CUSTOM_EVENT, CUSTOM_EVENT_MAP = CUSTOM_EVENT_MAP }';

    // 写入文件至 script/y3toolsJson/customEvent.lua
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
    let filePath = path.join(dirPath, 'customEvent.lua');
    fs.writeFileSync(filePath, eventJson);
}