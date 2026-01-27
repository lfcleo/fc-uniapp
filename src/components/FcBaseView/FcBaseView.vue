<template>
    <view class="base-view flexc fc-bg fc-text min-h-full box-border overflow-y-auto relative"
        :class="props.customClass" :style="computedStyle">
        <slot />
    </view>
</template>

<script setup lang="ts">

// 为了兼容小程序，解决样式隔离问题，使用props组合class样式
const props = defineProps({
    customClass: {
        type: String,
        default: ''
    }
})

// 计算组件的样式，应用默认主题变量
const computedStyle = computed(() => {
    return {}
});

</script>

<style lang="scss" scoped>
.base-view {
    /* 通用过渡效果 */
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* WebKit 浏览器 (Chrome, Safari) 自定义滚动条样式 */
.base-view::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
