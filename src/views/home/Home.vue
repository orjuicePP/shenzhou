<template>
    <div>
        <!-- 头部导航栏 -->
        <Header></Header>
    </div>
</template>

<script>
import Header from '../../components/content/Header.vue';
import util from "common/utils.js"
window.util = util;

export default {
    components: { Header },
}
</script>

<style>
</style>