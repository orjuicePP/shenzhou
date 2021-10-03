<template>
    <div>
        <!-- 头部导航栏 -->
        <Header></Header>

        <!-- 轮播图 -->
        <div class="run">
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in imgList" :key="item.id">
                    <img :src="item.idView" class="image" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 周游神州 -->
        <div class="tour">周游神州</div>

        <!-- 导游 -->
        <div class="homeGuide">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="名气导游" name="first">名气导游</el-tab-pane>
                <el-tab-pane label="我的咨询" name="second">我的咨询</el-tab-pane>
            </el-tabs>
        </div>

        <!-- 一起游 -->
        <div class="together">一起游</div>

        <!-- 页脚 -->
        <div class="footer"></div>

        <!-- 回到顶部 -->
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import ElementUI from "plugins/ElementUI.js";
import util from "common/utils.js"
window.util = util;

export default {
    components: { Header },

    data() {
        return {
            activeName: 'first',
            imgList: [
                { id: 0, idView: require("assets/img/one.png") },
                { id: 1, idView: require("assets/img/one.png") },
                { id: 2, idView: require("assets/img/one.png") },
                { id: 3, idView: require("assets/img/one.png") },
            ],
        };
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    }
}
</script>

<style>
.run,
.tour,
.homeGuide,
.together {
    width: var(--baseWidth);
    margin: 20px auto;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.tour,
.homeGuide,
.together {
    background-color: pink;
    height: 390px;
}

.footer {
    height: 180px;
    background-color: yellowgreen;
}
</style>