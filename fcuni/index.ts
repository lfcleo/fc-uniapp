import { Store } from './stores'
import { useSysGlobalStore } from './stores/system'
import { Router } from './router'
// import { i18n } from './locale'
// import { Updated } from './updated'
// import { Utils } from './utils'
// import Request from './request'
// import Upload from './upload'
// import Download from './download'
// import WebSocket from './websocket'
// #ifdef APP-PLUS
// import { Authorize } from './authorize/index'
// import { JGPush } from './jgPush/index'
// #endif

/**
 * 系统核心功能类
 */
export default {
    /** 全局状态管理 */
    Store,
    /** 系统全局状态管理 */
    useSysGlobalStore,
    /** 路由管理 */
    Router,
    /** 国际化工具 */
    // i18n,
    /** 应用更新管理 */
    // Updated,
    /** 工具类 */
    // Utils,
    /** 网络请求工具 */
    // Request,
    /** 文件上传工具 */
    // Upload,
    /** 文件下载工具 */
    // Download,
    /** WebSocket工具 */
    // WebSocket,
    // #ifdef APP-PLUS
    /** 系统权限管理 */
    // Authorize,
    /** 极光推送功能 */
    // JGPush,
    // #endif
}
