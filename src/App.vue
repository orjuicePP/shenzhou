<template>
    <div id="app">
        <!-- 路由占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
import util from 'common/utils.js';
window.util = util;

export default {
    name: "App",
    data() {
        return {};
    },
    beforeCreate() {
        document.title = "神州游";
    },
};
</script>

<style>
@import url("//at.alicdn.com/t/font_2847850_gsla7ywan2m.css");
#app {
    --baseWidth: 1280px;
    --headerHeight: 60px;
}

body {
    background-color: #e3e3e3;
}
</style>
