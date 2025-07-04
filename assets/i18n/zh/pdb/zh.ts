const win = window as any;

export const languages = {
    // Data
    test:"测试",
};

if (!win.i18n) win.i18n = {};
if (!win.i18n.languages) win.i18n.languages = {};
if (!win.i18n.languages.pdb) win.i18n.languages.pdb = {};
if (!win.i18n.languages.pdb.zh) win.i18n.languages.pdb.zh = {};
win.i18n.languages.pdb.zh = languages;