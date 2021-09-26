<template>
    <div class="admin">
        <Header></Header>
        <div class="core">管理员页面</div>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/content/Header.vue';
export default {
    name: 'Administrator',
    data() {
        return {};
    },
    components: {
        Header,
    }
};
</script>

<style scoped>
.admin {
    width: 100%;
    height: 100%;
    background-color: #eee;
}
</style>