import PAGES from "@/pages.json"

/**
 * 路由管理类
 */
class FCRouter {
    [key: string]: any  // 添加索引签名，允许动态属性

    public config: FCType.RouterConfig = {
        whiteList: [],
    }

    constructor() {
        // 预定义基础方法
        this.parseParams = this.parseParams.bind(this);
    }

    /**
     * 处理路径字符串：提取最后两级路径并组合（最后一级首字母大写）
     * @example 
     * processPath("/pages/demo") // "demo"
     * processPath("/pages/demo/locale") // "demoLocale"
     * processPath("/pages/demo/locale/index") // "localeIndex"
     * @param path 原始路径字符串
     * @returns 处理后的字符串
     */
    private processPath(path: string): string {
        // 1. 清理首尾斜杠并分割
        const parts = path
            .replace(/^\/+|\/+$/g, '') // 移除首尾所有斜杠
            .split('/')
            .filter(Boolean); // 过滤空片段

        // 2. 处理不同深度的路径
        if (parts.length <= 1) {
            return parts[0] || '';
        }

        if (parts.length === 2) {
            return parts[1]; // 二级路径直接返回最后一段
        }

        // 3. 三级及以上路径：取最后两段
        const [secondLast, last] = parts.slice(-2);

        // 4. 驼峰化组合：最后部分首字母大写
        const capitalizedLast = last.charAt(0).toUpperCase() + last.slice(1);
        return secondLast + capitalizedLast;
    }

    /**
     * 初始化路由配置
     * @param config - 路由配置对象，包含白名单等配置项
     * @returns this - 返回当前实例，支持链式调用
     */
    public init(config?: FCType.RouterConfig): this {
        // 添加路由跳转拦截器，用于判断是否需要拦截路由跳转
        if (config) {
            this.config = config;
            uni.addInterceptor("navigateTo", this.navigateToInterceptor)
        }

        if (PAGES.pages) {
            // 基于 pages.json 中的页面路径动态生成路由方法
            PAGES.pages.forEach((page: any) => {
                if (page.path) {
                    // 将路径转换为方法名，例如 '/pages/demo/locale' -> 'demoLocale'
                    const methodName = this.processPath(page.path)

                    // 创建路由跳转方法
                    Object.defineProperty(this, methodName, {
                        value: (params?: Record<string, any>) => {
                            let url = page.path;
                            if (params) {
                                url += this.parseParams(params);
                            }
                            uni.navigateTo({ url: `/${url}` });
                        },
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                }
            });
        }
        return this;
    }

    /**
     * 移除路由跳转拦截器
     */
    public removeInterceptor() {
        uni.removeInterceptor('navigateTo')
    }

    /**
     * 解析跳转页面传递的参数，将其转换为URL查询字符串格式
     * @param data - 跳转页面传递的参数，键值对形式
     * @returns string - 解析后的URL查询字符串，格式为'?key1=value1&key2=value2'
     */
    public parseParams(data: Record<string, any> | null): string {
        if (data == null) {
            return '';
        }

        const ids = Object.keys(data);
        let params = '?';

        ids.forEach((value: string, key: number) => {
            if (typeof data[value] === 'object') {
                params += value + "=" + encodeURIComponent(JSON.stringify(data[value]));
            } else {
                params += value + "=" + data[value];
            }
            params += "&";
        });

        params = params.substring(0, params.length - 1);
        return params;
    }

    /**
     * 路由跳转拦截器，用于判断是否需要拦截路由跳转
     */
    private navigateToInterceptor = {
        invoke: ({ url }: { url: string }) => {
            const path = url.split('?')[0]

            // 判断当前窗口是白名单，如果是则不重定向路由
            let pass = this.config.whiteList.findIndex((eUrl: string): boolean => eUrl == path)
            // 不是白名单并且没有token,重定向到登录界面
            if (pass == -1 && (this.config.shouldInterceptRoute ? this.config.shouldInterceptRoute() : true)) {
                if (this.config.interceptFunc) {
                    this.config.interceptFunc()
                }
                return false
            }
            return true
        },
    }
}

export const Router = new FCRouter();