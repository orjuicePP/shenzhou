<template>
    <div class="headerRoot">
        <div class="header">
            <div class="headerMain">
                <div class="logo">logo</div>
                <div class="userInfo">{{"杨超旭"}}</div>
                <div class="shop">商城</div>
                <div class="admin">管理员页</div>
                <div class="guide">导游页</div>
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
    background-color: #fff;
}

.headerMain {
    width: var(--baseWidth);
    height: 100%;
    margin: auto;
}

.headerMain .logo {
    float: left;
    width: 200px;
    height: 100%;
    background-color: yellow;
}

.headerMain .userInfo {
    float: right;
    width: 100px;
    height: 100%;
    background-color: yellow;
}

.headerMain .shop {
    float: right;
    width: 60px;
    height: 100%;
    line-height: var(--headerHeight);
    color: #333;
    cursor: pointer;
}

.headerMain .shop:hover {
    color: #ff5c38;
}

.headerMain .admin,
.headerMain .guide {
    float: left;
    padding: 0px 20px;
    height: 100%;
    line-height: var(--headerHeight);
}

.fill {
    width: 100%;
    height: var(--headerHeight);
}
</style>