<template>
    <div id="app">
        <!-- 路由占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
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
</style>
