// import { userUserStore } from "@/modules/stores/user"

// 路由配置,主要是拦截器
export const config = {
    /**
     * 路由拦截白名单，这里面的页面不会被拦截，会正常进行路由跳转【根据实际情况定义】
     */
    whiteList: [
        //更多页面路径...
    ],
    /**
     * 路由拦截判断方法，这里面的内容代表，未登录用户将会被拦截【根据实际情况定义】
     */
    shouldInterceptRoute(): boolean {
        // return userUserStore().id == 0
        return true
    },
    /**
     * 路由拦截执行方法，这里面的内容代表，拦截路由后，跳转到登录页面【根据实际情况定义】
     */
    interceptFunc() {
        // uni.navigateTo({ url: "/pages/login/login" })
    }
} as FCType.RouterConfig