const win = window as any;

export const languages = {
    "common_prompt_ok": "确定",
    "common_prompt_cancal": "取消",
    "common_prompt_title_sys": "系统提示",
    "common_prompt_content": "系统提示内容",
    "common_prompt": "公共弹窗",
};

if (!win.i18n) win.i18n = {};
if (!win.i18n.languages) win.i18n.languages = {};
if (!win.i18n.languages.main) win.i18n.languages.main = {};
if (!win.i18n.languages.main.zh) win.i18n.languages.main.zh = {};
win.i18n.languages.main.zh = languages;