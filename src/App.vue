<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {};
    },
    beforeCreate () {
        document.title = '神州游';
    }
};
</script>

<style>
</style>
