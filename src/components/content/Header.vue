<template>
    <div class="headerRoot">
        <div class="header">
            <div class="headerMain">
                <div class="logo">logo</div>
                <div class="userInfo">
                    <div class="photo"></div>
                    <div class="username">{{user.username}}</div>
                    <div class="info"></div>
                </div>
                <div class="shop">商城</div>
                <div v-if="user.isAdmin" class="admin">管理员页</div>
                <div v-if="user.isGuide" class="guide">导游页</div>
            </div>
        </div>
        <div class="fill"></div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            user: {
                username: '杨超旭',
                account: '1808078515',
                other: '暂无',
                experience: 0,
                level: 1,
                headPortraitUrl: 'url',
                isAdmin: true,
                isGuide: true,
            }
        };
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: var(--headerHeight);
    position: fixed;
    /* background-color: #fff; */
    background-color: burlywood; 
    /* z-index: 1; */
}

.headerMain {
    --userInfoHeight: 40px;
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
    position: relative;
    float: right;
    height: var(--userInfoHeight);
    margin-top: calc((var(--headerHeight) - var(--userInfoHeight)) / 2);
    background-color: yellow;
}

.headerMain .userInfo .photo {
    float: left;
    width: var(--userInfoHeight);
    height: var(--userInfoHeight);
    border-radius: 20px;
    background-color: pink;
}

.headerMain .userInfo .username {
    float: right;
    padding: 0px 0px 0px 10px;
    font-size: 24px;
    line-height: var(--userInfoHeight);
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
    color: #666;
    cursor: pointer;
}

.headerMain .admin:hover,
.headerMain .guide:hover {
    color: #000;
}

.fill {
    width: 100%;
    height: var(--headerHeight);
}
</style>