import { createPinia, type Pinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useSysGlobalStore } from './system'
import { watch, getCurrentInstance } from 'vue';

/**
 * Pinia状态管理类
 */
export class FCStore {
    public pinia: Pinia;

    /**
     * 构造函数 - 初始化Pinia实例
     */
    constructor() {
        this.pinia = createPinia();
        this.pinia.use(piniaPluginPersistedstate);
    }

    /**
     * 初始化主题切换
     */
    public initTheme(themeData: object) {
        // 获取store实例
        const sysStore = useSysGlobalStore();
        if (Object.keys(sysStore.theme).length == 0) {
            sysStore.theme = themeData
        }

        watch(() => sysStore.theme, (newVal: object) => {
            // 只有当值为对象且与当前值不同时才进行处理
            if (JSON.stringify(newVal) !== JSON.stringify(sysStore.theme)) {
                // 深拷贝对象以确保响应式
                sysStore.theme = JSON.parse(JSON.stringify(newVal));
            }

            if ('navbar' in sysStore.theme) {
                // 设置系统导航栏主题
                uni.setNavigationBarColor({
                    ...(sysStore.theme.navbar as object),
                    animation: {
                        duration: 300, // 动画持续时间（毫秒）
                        timingFunc: 'easeInOut' // 动画效果
                    }
                })
            }
        }, { deep: true });
    }

    /**
     * 初始化语言切换
     */
    public initLocale() {
        const instance = getCurrentInstance();
        // 获取store实例
        const sysStore = useSysGlobalStore();

        watch(() => sysStore.language, (newVal: string) => {
            uni.setLocale(newVal)
            instance!.proxy!.$i18n.locale = newVal
        }, { immediate: true });
    }
}

// 导出单例实例
export const Store = new FCStore();
