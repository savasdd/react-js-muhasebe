import cookie from "react-cookies";

export const _BASE = 'http://localhost:8085/api/';

export const MUH_URL = {
    HEADER: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${cookie.load('tkn')}`,
        // 'Access-Control-Allow-Origin': '*',
    },
    MUH_TOKEN: _BASE + 'auth/token',

    KULLANICI: {
        SORGU: _BASE + 'kullanicis',
        GETID: _BASE + 'kullanicis/',
        CREATE: _BASE + 'kullanicis',
        UPDATE: _BASE + 'kullanicis/',
        DELETE: _BASE + 'kullanicis/'
    },
    HESAP: {
        SORGU: _BASE + 'hesaps',
        GETID: _BASE + 'hesaps/',
        CREATE: _BASE + 'hesaps',
        UPDATE: _BASE + 'hesaps/',
        DELETE: _BASE + 'hesaps/'
    },
    KIRACI: {
        SORGU: _BASE + 'kiracis',
        GETID: _BASE + 'kiracis/',
        CREATE: _BASE + 'kiracis',
        UPDATE: _BASE + 'kiracis/',
        DELETE: _BASE + 'kiracis/'
    },
    BEDEL: {
        SORGU: _BASE + 'bedels',
        GETID: '/bedels/',
        CREATE: '/bedels',
        UPDATE: '/bedels/',
        DELETE: '/bedels/'
    },
    KOD: {
        SORGU: _BASE + 'kods',
        GETID: _BASE + 'kods/',
        GETUST: _BASE + 'kods/ust/',
        CREATE: _BASE + 'kods',
        UPDATE: _BASE + 'kods/',
        DELETE: _BASE + 'kods/'
    },
    ROL: {
        SORGU: _BASE + 'rols',
        GETID: _BASE + 'rols/',
        CREATE: _BASE + 'rols',
        UPDATE: _BASE + 'rols/',
        DELETE: _BASE + 'rols/'
    },
    ORAN: {
        SORGU: _BASE + 'orans',
        GETID: _BASE + 'orans/',
        CREATE: _BASE + 'orans',
        UPDATE: _BASE + 'orans/',
        DELETE: _BASE + 'orans/'
    },
    LOG: {
        USER: _BASE + 'logs/kullanicis',
        ISLEM: _BASE + 'logs/islems',
        HATA: _BASE + 'logs/hatas',
    },
    RAPOR: {
        SORGU: _BASE + 'rapors',
    },
};
