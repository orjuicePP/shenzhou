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
@import url("//at.alicdn.com/t/font_2847850_lhjxeomyfcq.css");
#app {
    --baseWidth: 1280px;
    --headerHeight: 60px;
}

body {
    background-color: #e3e3e3;
}

.beforeBtn::before {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: inherit;
    content: "";
}

.beforeBtn:hover::before {
    display: none;
}
</style>
