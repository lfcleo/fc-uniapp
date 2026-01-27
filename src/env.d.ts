/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare namespace FCType {
    // 系统全局状态模型
    interface TypeGlobal {
        agreePrivacy: boolean;          // 是否同意用户协议/隐私政策
        language: string;               // 语言，默认中文zh
        theme: any;               // 主题
    }

    // 检查更新参数模型
    interface CheckUpdatedParams {
        checkUpdateApi?: () => Promise<AppUpdated>;
        isManual?: boolean;
        pageUrl?: string;
    }

    // 应用更新模型
    interface AppUpdated {
        describe: string;        // 版本更新内容（富文本）
        edition_url: string,     // apk、wgt包下载地址或者应用市场地址  安卓应用市场 market://details?id=xxxx 苹果store itms-apps://itunes.apple.com/cn/app/xxxxxx
        edition_force: number,   // 是否强制更新 0代表否 1代表是
        package_type: number,    // 0是整包升级（apk或者appstore或者安卓应用市场） 1是wgt升级
        edition_issue: number,   // 是否发行  0否 1是 为了控制上架应用市场审核时不能弹出热更新框
        edition_number: number,  // 版本号 最重要的manifest里的版本号 （检查更新主要以服务器返回的edition_number版本号是否大于当前app的版本号来实现是否更新）
        edition_name: string,    // 版本名称 manifest里的版本名称
        edition_silence: number, // 是否静默更新 0代表否 1代表是
    }

    /**
     * 极光推送客户端配置接口
     */
    interface JGPushConfig {
        /** 是否启用日志 */
        loggerEnable?: boolean;
        /** 连接状态事件监听器 */
        connectEventListener?: (result: any) => void;
        /** 通知事件监听器 */
        notificationListener?: (result: any) => void;
        /** 自定义消息事件监听器 */
        customMessageListener?: (result: any) => void;
        /** 应用内消息事件监听器 */
        inMessageListener?: (result: any) => void;
        /** 本地通知事件监听器 */
        localNotificationListener?: (result: any) => void;
    }

    /**
     * 请求队列项接口
     */
    export interface RequestQueueItem {
        resolve: (value: any) => void;
        reject: (reason: any) => void;
        options: UniApp.RequestOptions;
        showLoading: boolean;
    }

    /**
     * 下载文件客户端配置接口
     */
    export interface DownloadConfig {
        /** 基础URL */
        baseURL?: string;
        /** 请求超时时间（毫秒） */
        timeout?: number;
        /** 下载拦截器 */
        downloadInterceptors?: (config: UniApp.DownloadFileOption) => void;
        /** 下载成功拦截器 */
        downloadSuccess?: (response: UniApp.DownloadSuccessData) => boolean;
        /** 下载完成拦截器 */
        downloadComplete?: () => void;
        /** 下载错误拦截器 */
        downloadError?: (err: UniApp.GeneralCallbackResult) => void;
        /** 判断是否需要刷新token */
        shouldRefreshToken?: (response: UniApp.DownloadSuccessData) => boolean;
        /** 刷新token的方法 */
        refreshTokenMethod?: () => Promise<boolean>;
    }

    /**
     * HTTP请求客户端配置接口
     */
    export interface RequestConfig {
        /** 基础URL */
        baseURL?: string;
        /** 请求超时时间（毫秒） */
        timeout?: number;
        /** 请求拦截器 */
        requestInterceptors?: (config: UniApp.RequestOptions) => void;
        /** 响应成功拦截器 */
        responseSuccess?: (response: UniApp.RequestSuccessCallbackResult) => boolean;
        /** 响应完成拦截器 */
        responseComplete?: () => void;
        /** 响应错误拦截器 */
        responseError?: (err: UniApp.GeneralCallbackResult) => void;
        /** 响应数据解析器，用于自定义响应数据结构 */
        responseParser?: <T>(data: any) => T;
        /** 判断是否需要刷新token */
        shouldRefreshToken?: (response: UniApp.RequestSuccessCallbackResult) => boolean;
        /** 刷新token的方法 */
        refreshTokenMethod?: () => Promise<boolean>;
    }

    /**
     * 上传文件客户端配置接口
     */
    export interface UploadConfig {
        /** 基础URL */
        baseURL?: string;
        /** 请求超时时间（毫秒） */
        timeout?: number;
        /** 上传拦截器 */
        uploadInterceptors?: (config: UniApp.UploadFileOption) => void;
        /** 上传成功拦截器 */
        uploadSuccess?: (response: UniApp.UploadFileSuccessCallbackResult) => boolean;
        /** 上传完成拦截器 */
        uploadComplete?: () => void;
        /** 上传错误拦截器 */
        uploadError?: (err: UniApp.GeneralCallbackResult) => void;
        /** 判断是否需要刷新token */
        shouldRefreshToken?: (response: UniApp.UploadFileSuccessCallbackResult) => boolean;
        /** 刷新token的方法 */
        refreshTokenMethod?: () => Promise<boolean>;
    }

    /**
     * WebSocket 配置接口
     */
    export interface WebSocketConfig {
        /** WebSocket 服务器的 URL */
        url: string;
        /** 心跳发送的间隔时间（秒），如果设置为0，则不启用心跳检测 */
        heartTime?: number;
        /** 心跳消息内容，默认值为 'ping' */
        heartMessage?: string;
        /** 最大重连次数，默认值为 5，设置为 -1 表示无限重连 */
        maxReconnectAttempts?: number;
        /** 初始重连延迟（毫秒），默认值为 3000 */
        reconnectDelay?: number;
        /** 最大重连延迟（毫秒），默认值为 30000 */
        maxReconnectDelay?: number;
        /** 重连延迟增长倍数，默认值为 2 */
        reconnectDelayMultiplier?: number;
        /** 心跳超时时间（秒），默认值为 heartTime * 2 */
        heartTimeoutTime?: number;
        /** 请求拦截器，用于在连接前修改WebSocket连接配置，如添加header等 */
        requestInterceptors?: (config: UniApp.ConnectSocketOption) => void;
        /** 连接成功回调 */
        onOpen?: (event: any) => void;
        /** 消息接收回调 */
        onMessage?: (message: string) => void;
        /** 连接错误回调 */
        onError?: (error: UniApp.GeneralCallbackResult) => void;
        /** 连接关闭回调 */
        onClose?: (event: any) => void;
        /** 重连尝试回调 */
        onReconnectAttempt?: (attempt: number, delay: number) => void;
        /** 重连成功回调 */
        onReconnectSuccess?: () => void;
        /** 重连失败回调 */
        onReconnectFailed?: (totalAttempts: number) => void;
    }

    /**
     * 路由管理类配置接口
     */
    export interface RouterConfig {
        whiteList: string[]; // 路由白名单
        shouldInterceptRoute?: () => boolean; // 是否需要拦截路由跳转
        interceptFunc?: () => void; // 路由跳转拦截器函数，用于自定义路由跳转逻辑
    }
}