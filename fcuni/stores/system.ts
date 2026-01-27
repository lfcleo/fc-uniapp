import { defineStore } from "pinia";

export const useSysGlobalStore = defineStore('sysGlobal', () => {
    const language = ref('zh-Hans');    // 语言，默认中文简体
    const theme = ref<object>({}); // 主题深拷贝

    return {
        language,
        theme,
    };
}, {
    persist: {
        key: 'SYS_GLOBAL',
        storage: {
            getItem: uni.getStorageSync,
            setItem: uni.setStorageSync
        }
    }
});