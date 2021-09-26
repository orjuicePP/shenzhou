<template>
    <div class="root">
        <div class="header">
            <div class="headerMain">
                <div class="logo"></div>
                <div class="userInfo"></div>
                <div class="shop"></div>
                <div class="admin"></div>
                <div class="guide"></div>
            </div>
        </div>
        <div class="fill"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
    width: 100%;
    height: var(--headerHeight);
    position: fixed;
    background-color: pink;
}

.headerMain {
    width: var(--basrWidth);
    height: 100%;
    background-color: skyblue;
}
</style>