export type Language = {
    name: string;
    flag: string;
    code: string;
}

export const AVAILABLE_LANGUAGES: { [key: string]: Language } = {
    "en": {
        "name": "English",
        "flag": "/flags/us.svg",
        "code": "en"
    }
}

export const getLanguageByCode = (code: string): Language | undefined => {
    return AVAILABLE_LANGUAGES[code];
}
