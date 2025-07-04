const win = window as any;

export const languages = {
    // Data
    test:"Test",
};

if (!win.i18n) win.i18n = {};
if (!win.i18n.languages) win.i18n.languages = {};
if (!win.i18n.languages.pdb) win.i18n.languages.pdb = {};
if (!win.i18n.languages.pdb.en) win.i18n.languages.pdb.en = {};
win.i18n.languages.pdb.en = languages;