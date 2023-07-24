import { type } from "os";

declare interface Tuple<T extends any[]> {
    __tuple__: boolean;
    items: [...T];
}

type AnchorCfg = Tuple<[X: number, Y: number]>;

type SizeCfg = Tuple<[X: number, Y: number]>;

/**
 * 位置配置
 */
type PosCfg = Tuple<[X: number, Y: number]>;

/**
 * 百分比位置配置（画板拉伸模式下使用）
 */
type PosPerCfg = Tuple<[X: number, Y: number]>;

type TextCfg = Tuple<[content: string, multilingual: boolean]>;

type LabelEffectCfg = Tuple<[bold: boolean, italic: boolean, underline: boolean, shadow: boolean]>;

type ImageCfg = Tuple<[number, number]>;

type CameraPosCfg = Tuple<[X: number, Y: number, Z: number]>;
type ForcusPosCfg = Tuple<[X: number, Y: number, Z: number]>;

/**
 * 对齐配置
 * @interface AlignCfg
 * @extends {Tuple<[number, number]>}
 * @param {[]} items 元组数据
 * @param {number} items.herizen 水平对齐 1 左 2 中 4 右
 * @param {number} items.vertical 垂直对齐 0 上 8 中 16 下
 */
type AlignCfg = Tuple<[herizen: number, vertical: number]>;

/**
 * 字体配置
 * @interface FontCfg
 * @extends {Tuple<[string, number]>}
 * @param {[]} items 元组数据
 * @param {string} items.fontType 字体名称
 * @param {number} items.fontSize 字体大小
 */
type FontCfg = Tuple<[fontType: string, fontSize: number]>;

type ModelCfg = Tuple<[type: 'editor_model', id: number]>;

type ClipCfg = Tuple<[left: number, top: number, right: number, bottom: number]>;

/**
 * 颜色配置
 * @interface ColorCfg
 * @extends {Tuple<[number, number, number, number]>}
 * @param {[]} items 元组数据
 * @param {number} items.R 红色 0-255
 * @param {number} items.G 绿色 0-255
 * @param {number} items.B 蓝色 0-255
 * @param {number} items.A 透明度 0-255
 */
type RgbaCfg = Tuple<[R: number, G: number, B: number, A: number]>;
type RgbCfg = Tuple<[R: number, G: number, B: number]>;

/**
 * 文本绑定配置
 * @interface TextBindCfg
 * @extends {Tuple<[number, string]>}
 * @param {[]} items 元组数据
 * @param {number} items.type 绑定类型 1 单位属性 2 全局变量(字符串) 3 玩家属性
 * @param {string} items.name 绑定的属性名
 */
type TextBindCfg = Tuple<[type: number, name: string]>;

interface AdapterCfg extends Array<boolean | number> {
    0: boolean; // 适配上
    1: boolean; // 适配下
    2: boolean; // 适配左
    3: boolean; // 适配右
    4: number; // 适配上
    5: number; // 适配下
    6: number; // 适配左
    7: number; // 适配右
}

type Button = {
    type: 1;
    bar_status?: boolean; // 是否更多按钮状态
    font?: FontCfg;
    disabled_text?: TextCfg;
    normal_font_color?: RgbaCfg;
    normal_text?: TextCfg;
    press_text?: TextCfg;
    suspend_text?: TextCfg;
    touch_scale?: SizeCfg;
    short_cut?: number; // 快捷键
    short_cut_2?: number; // 组合快捷键 默认0 shift 42 alt 56ctrl 29
} & ({
    background_type: 0;
    normal_color?: RgbaCfg;
    suspend_color?: RgbaCfg;
    press_color?: RgbaCfg;
} | {
    disabled_picture?: number;
    suspend_picture?: number;
    normal_picture?: number;
    press_picture?: number;
});

interface Text {
    alignment?: AlignCfg;
    font_min_size?: number; // 最小字体
    label_effect?: LabelEffectCfg; // 文字特效
    font?: FontCfg; // 字体
    over_pattern?: boolean; // 是否超出裁剪
    font_color?: RgbaCfg; // 字体颜色
    bold?: boolean; // 加粗
    italics?: boolean; // 斜体
    shadow?: boolean; // 阴影
    line_space?: number; // 行间距
    review_word?: boolean; // 敏感词过滤
    text_bind?: TextBindCfg; // 数据绑定
    text_format?: string; // 绑定字符替换
    typewriter_effect?: number; // 打字机效果 0 无 1 中文 2 英文单词 3 英文字母
    typewriter_space?: number; // 打字机间隔
}
type Label = {
    type: 3;
} & Text;

interface Scale9 {
    is_scale9_enable?: boolean; // 是否开启九宫格
    cap_insets?: ClipCfg; // 九宫格
}

type Image = {
    type: 4;
    color?: RgbaCfg; // 叠加颜色
    image?: number;
} & Scale9;
type Progress = {
    type: 5;
    progress_type?: 0 | 1; // 0 环形 1 条形
    current_value?: number; // 当前进度值
    max_value?: number; // 最大进度值
    reverse?: boolean; // 是否翻转进度条
    is_scale9_enable?: boolean; // 是否开启九宫格
} & ({
    background_type: 0; // 0 纯色 1 图片
    bg_color?: RgbaCfg;
    color?: RgbaCfg;
} | {
    background_image?: number;
    image?: number;
    bg_image?: number;
});

type Model = {
    type: 6;
    angle: [x: number, y: number, z: number];
    background_color?: RgbaCfg;
    camera_mode?: number; // 0 自定义 1 智能全身 2 智能头像
    camera_pos?: CameraPosCfg;
    focus_pos?: ForcusPosCfg;
    model: ModelCfg;
    carmera_rotation?: number; // 镜头旋转
    camera_viewport?: number; // 镜头视口
};

type Layout = {
    type: 7;
    clip_enabled?: boolean;
    mask_image?: number;
    clipping_type?: 0; // 0 像素裁切 1 容器裁切
    color?: RgbaCfg;
};
type Tab = {
    type: 8;
    cur_page_index?: number;
    image?: [normal: number, active: number];
    layout_type?: 0 | 1; // 0 水平 1 垂直
    page_num?: number;
    bg_image?: number;
};
type Page = {
    type: 9;
};
type Scroll = {
    type: 10;
    block_scrolling?: boolean; // 是否禁止滚动
    bg_color?: RgbaCfg; // 背景颜色
    bg_image?: number; // 背景图片
    layout_type?: 0 | 1; // 0 水平 1 垂直
    bounce_enabled?: boolean; // 下拉回弹
    margin?: number; // 控件间距
    layout_reverse?: boolean; // 是否反向布局
    scroll_bar_enable?: boolean; // 是否显示滚动条
    size_change_according_children?: boolean; // 是否根据子控件自动调整大小
} & Scale9;

type Slider = {
    type: 11;
    bar_normal_color?: RgbaCfg; // 滑块颜色
    bar_normal_image?: number; // 滑块图片
    bar_scale?: SizeCfg; // 滑块缩放
    bg_image?: number; // 背景图片
    bg_color?: RgbaCfg; // 背景颜色
    progress_color?: RgbaCfg; // 进度条颜色
    percent?: number; // 进度条百分比
} & ({
    bar_status: true; // 是否更多按钮状态
    image?: number; // 进度条图片
    bar_image: [hover: number, press: number, disable: number];
} | {
})
type MiniMap = {
    type: 16;
    icon_color_type?: 1; // 0 敌友显示模式 1 玩家颜色显示模式
}
type SkillBtn = {
    type: 17;
    skill_cd_label: string;
    skill_cd_progress: string;
    skill_consume_mask_img: string;
    skill_disable_img: string;
    skill_frame_img: string;
    skill_icon_img: string;
    skill_level_label: string;
    skill_shortcut_label: string;
    skill_stack_label: string;
    skill_type: number;
    skill_upgrade_btn: string;
    slot_id: number;
}

type Input = {
    type: 15;
    font_color?: RgbaCfg;
    tip_text?: TextCfg;
    tip_text_color?: RgbCfg;
    font?: FontCfg;
};

type BuffList = {
    type: 18;
    template_buff_item: string;
}

type BuffItem = {
    type: 19;
    buff_frame_img: string;
    buff_icon_img: string;
    buff_stack_label: string;
    buff_time_progress: string;
}

type Equip = {
    type: 20;
    equip_bg_img: string;
    equip_cd_progress: string;
    equip_charge_label: string;
    equip_disabled_img: string;
    equip_icon_img: string;
    equip_stack_label: string;
    is_bind_unit: boolean;
    short_cut: number;
    short_cut_2: number;
    short_cut_smart_cast: number;
    short_cut_smart_cast_2: number;
    slot_index: number;
}
type RichText = Text & {
    type: 26;
};

type Setting = {
    type: 27;
}

type Chat = {
    type: 32;
    all_channel: string;
    alliance_channel: string;
    chat_input_field: string;
    chat_text_template: string;
    send_btn: string;
    short_cut_next?: number;
    short_cut_next_2?: number;
    short_cut_prev?: number;
    short_cut_prev_2?: number;
    short_cut_send?: number;
    short_cut_send_2?: number;
    short_cut_switch_channel?: number;
    short_cut_switch_channel_2?: number;
}
type Banner = {
    type: 33;
    auto_play?: boolean;
    auto_play_cd?: number;
    carousel_view?: string; // 频道选择
    page_can_drag?: boolean; // 可以拖拽切换
}
type AudioSwitch = {
    type: 34;
    btn_all: string;
    btn_camp: string;
    btn_disable: string;
    btn_micro: string;
    btn_nearby: string;
    btn_platform: string;
    btn_setting: string;
    btn_sound: string;
}

type Animation = {
    type: 38;
    loop?: boolean;
    space?: number; // 循环时间
    fx_id?: number; // 序列帧id
}

type UIElement = {
    open_adapter?: boolean; // 是否开启适配
    adapter_option?: AdapterCfg;
    children: UIElement[];
    event_list?: any[];
    name: string;
    opacity?: number;
    pos_percent?: PosPerCfg;
    pos?: PosCfg;
    size?: PosCfg;
    under_line?: boolean;
    scale?: SizeCfg;
    text?: TextCfg;
    swallow_touches?: boolean; // 是否拦截事件
    rotation?: number; // 旋转角度
    can_drag?: boolean; // 是否可拖拽
    anchor?: AnchorCfg; // 锚点
    ui_anims?: string[]; // 动画
    uid?: string;
    visible?: boolean;
} & (
        Button |
        Image |
        Layout |
        Tab |
        Label |
        Page |
        Progress |
        Model |
        Input |
        Scroll |
        Slider |
        MiniMap |
        SkillBtn |
        BuffList |
        BuffItem |
        Equip |
        RichText |
        Setting |
        Chat |
        Banner |
        AudioSwitch |
        Animation
    );

type PrefabElement = UIElement & ({
    custom_kv?: any; // 自定义键值对
    prefab_key?: string; // 没有 prefab_key 为官方预置
})

interface Pannel {
    adapt_mode: 1 | 2;
    children: UIElement[];
    name: string;
    opacity?: number;
    type: 2;
    ui_anims?: any[];
    uid: string;
    visible?: boolean;
    zorder?: number;
}

interface Prefab {
    design_resolution: SizeCfg; // 设计分辨率
    design_resolution_index: 0 | 1;
    first_init_ui_editor: boolean;
    ui_template_id: number;
    uid_version: boolean;
    prefab_data: {
        [key: string]: {
            data: PrefabElement;
            name
        }
    }
}