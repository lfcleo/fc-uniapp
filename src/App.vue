<script setup lang="ts">
import { onLaunch, onShow, onHide, onExit } from "@dcloudio/uni-app";
import { config } from "@/modules/router";

onLaunch(() => {
    console.log("App Launch");
    // 初始化路由, 注册路由和路由拦截器配置
    FC.Router.init(config)
});
onShow(() => {
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
onExit(() => {
    console.log("App Exit");
});
</script>

<style lang="scss">
@use '@/modules/style/app.scss';
</style>
