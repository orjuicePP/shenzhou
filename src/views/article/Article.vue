<template>
    <div class="ArticleRoot">
        <Header></Header>
        <div class="main">
            <div class="left">
                <div class="title"></div>
                <div class="content"></div>
                <div class="photo"></div>
                <div class="time"></div>
                <div class="thumb"></div>
            </div>
            <div class="right">
                <div class="authorInfo"></div>
                <div class="name"></div>
                <div class="province"></div>
                <div class="otherArticle">
                    <p>猜你喜欢</p>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
export default {
    name: 'Article',
    data() {
        return {};
    },
    components: {
        Header,
    }
};
</script>

<style>
.main {
    width: var(--baseWidth);
    height: 600px;
    margin: 30px auto;
}

.main > div {
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
}

.main > .left {
    float: left;
    width: 840px;
}

.main > .right {
    float: right;
    width: 360px;
}
</style>