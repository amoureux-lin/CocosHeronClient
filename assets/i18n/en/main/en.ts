const win = window as any;

export const languages = {
    "common_prompt_ok": "ok",
    "common_prompt_cancal": "cancal",
    "common_prompt_title_sys": "System Prompt",
    "common_prompt_content": "System Prompt Cpmtemt",
    "common_prompt": "common_prompt",
};

if (!win.i18n) win.i18n = {};
if (!win.i18n.languages) win.i18n.languages = {};
if (!win.i18n.languages.main) win.i18n.languages.main = {};
if (!win.i18n.languages.main.en) win.i18n.languages.main.en = {};
win.i18n.languages.main.en = languages;