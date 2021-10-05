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
        <div class="tour">
            <!-- 题目 -->
            <div class="tourTop">
                <!-- 标题 -->
                <h1 class="title">周游神州</h1>

                <!-- 写文章按钮 -->
                <div class="write" @click="dialogFormVisible = true">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        style="color: black; background-color: white; border-color: white;"
                    ></el-button>
                </div>
                <!-- 写文章对话框 -->
                <el-dialog title="分享你的旅游^_^" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <!-- 文章标题 -->
                        <el-form-item label="文章标题" :label-width="formLabelWidth">
                            <el-input v-model="form.title" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 景点名 -->
                        <el-form-item label="景点名" :label-width="formLabelWidth">
                            <el-input v-model="form.placeName" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 景点所在省份 -->
                        <el-form-item label="景点所在省份" :label-width="formLabelWidth">
                            <el-input v-model="form.province" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 文章内容 -->
                        <el-form-item label="文章内容" :label-width="formLabelWidth">
                            <el-input v-model="form.content" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 上传图片 -->
                        <el-form-item label="上传图片" :label-width="formLabelWidth">
                            <div class="photoBox">
                                <div class="top" :style="{backgroundImage: photoUrl}"></div>
                                <input type="file" ref="file" class="right" @change="uploadPhoto" />
                            </div>
                        </el-form-item>
                    </el-form>

                    <!-- 按钮 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false; submit()">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 筛选器 -->
                <div class="select">
                    <el-dropdown>
                        <el-button
                            type="primary"
                            style="background-color: rgb(244, 243, 244); border-color: rgb(244, 243, 244); color: black"
                        >
                            筛选条件
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>按热度</el-dropdown-item>
                            <el-dropdown-item>按省份</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

            <!-- 内容 -->
            <div class="tourContent">
                <div class="box" v-for="(item,index) in articles">
                    <h3>{{item.title}}</h3>
                    <span class="boxProvince">{{item.province}}</span>
                    <span class="boxPlace">{{item.placeName}}</span>
                    <span class="boxAuthor">{{item.authorAccount}}</span>
                    <span class="boxContent">{{item.content}}</span>
                    <span class="boxTime">{{item.releaseTime}}</span>
                    <span class="boxThumb">{{item.thumb}}</span>
                </div>
            </div>
        </div>

        <!-- 导游 -->
        <div class="homeGuide">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <!-- 名气导游 -->
                <el-tab-pane label="名气导游" name="first">
                    <div
                        class="guideBox"
                        v-for="(item,index) in guides"
                        @click="dialogFormVisible2 = true"
                    >
                        <h3>{{item.name}}</h3>
                        <p>{{item.brief}}</p>
                        <span>评分：{{item.score}}</span>
                    </div>
                </el-tab-pane>

                <!-- 向导游发起咨询对话框 -->
                <el-dialog title="向导游发起咨询" :visible.sync="dialogFormVisible2">
                    <el-form :model="form2">
                        <el-form-item label="请输入你的问题" :label-width="formLabelWidth">
                            <el-input v-model="form2.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 我的咨询 -->
                <el-tab-pane label="我的咨询" name="second">
                    <div
                        class="guideBox myConsults"
                        v-for="(item,index) in rules.gui"
                        @click="dialogFormVisible3 = true && item.clickFlag "
                    >
                        <h3>{{item.guide}}</h3>
                        <p v-if="item.stage == 0">等待导游回答</p>
                        <p v-if="item.stage == 1">导游已回答，请点击评分</p>
                        <span>{{item.date}}</span>
                    </div>

                    <!-- 用户评分对话框 -->
                    <el-dialog title="请给这位导游的回答评个分吧！" :visible.sync="dialogFormVisible3">
                        <el-form :model="form3">
                            <el-form-item label="你的评分" :label-width="formLabelWidth">
                                <el-input v-model="form3.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                            <el-button
                                type="primary"
                                @click="dialogFormVisible3 = false;submitScore()"
                            >确 定</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 一起游 -->
        <div class="together">
            <div class="tourTop">
                <!-- 标题 -->
                <h1 class="title">一起游</h1>

                <!-- 筛选器 -->
                <div class="select">
                    <el-dropdown>
                        <el-button
                            type="primary"
                            style="background-color: rgb(244, 243, 244); border-color: rgb(244, 243, 244); color: black"
                        >
                            筛选条件
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>省份</el-dropdown-item>
                            <el-dropdown-item>人数</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>

        <!-- 页脚 -->
        <div class="footer">
            <div class="footerCon"></div>
        </div>

        <!-- 回到顶部 -->
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import ElementUI from "plugins/ElementUI.js";
import { getUserInfo, getPhotoUrl, uploadPhoto, reUploadPhoto } from 'network/Public.js';
import { getArticles, releaseArticle, getOwnConsult, scoreConsult } from "network/Home.js";
import util from "common/utils.js";
window.util = util;

export default {
    components: { Header },

    data() {
        return {
            rule: {
                token: util.getCookie("token"),
                id: util.getCookie("account"),
            },
            activeName: 'first',
            imgList: [
                { id: 0, idView: require("assets/img/run1.png") },
                { id: 1, idView: require("assets/img/run2.png") },
                { id: 2, idView: require("assets/img/run3.png") },
                { id: 3, idView: require("assets/img/run4.png") },
            ],
            // 编写文章
            dialogFormVisible: false,
            form: {
                title: '',
                placeName: '',
                province: '',
                content: '',
                pictureId: '',
            },
            formLabelWidth: '120px',
            // 向导游发起咨询
            dialogFormVisible2: false,
            form2: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 用户给导游评分
            dialogFormVisible3: false,
            form3: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // clickFlag: false,
            // displayYes: true,
            // 一些测试数据
            articles: [
                { id: 1, title: '好困', province: '广东', placeName: '垃圾广金', authorAccount: 123, content: '困死困死困死困死困死困死', releaseTime: 123456, thumb: 10000 },
                { id: 2, title: '好困', province: '广东', placeName: '垃圾广金', authorAccount: 123, content: '困死困死困死困死困死困死', releaseTime: 123456, thumb: 10000 },
                { id: 3, title: '好困', province: '广东', placeName: '垃圾广金', authorAccount: 123, content: '困死困死困死困死困死困死', releaseTime: 123456, thumb: 10000 },
                { id: 4, title: '好困', province: '广东', placeName: '垃圾广金', authorAccount: 123, content: '困死困死困死困死困死困死', releaseTime: 123456, thumb: 10000 },
                { id: 5, title: '好困', province: '广东', placeName: '垃圾广金', authorAccount: 123, content: '困死困死困死困死困死困死', releaseTime: 123456, thumb: 10000 },
                { id: 6, title: '好困', province: '广东', placeName: '垃圾广金', authorAccount: 123, content: '困死困死困死困死困死困死', releaseTime: 123456, thumb: 10000 },
            ],
            guides: [
                { id: 1, name: '导游1', brief: '啦啦啦我好困不想做了', score: 100 },
                { id: 2, name: '导游2', brief: '啦啦啦我好困不想做了', score: 100 },
                { id: 3, name: '导游3', brief: '啦啦啦我好困不想做了', score: 100 },
                { id: 4, name: '导游4', brief: '啦啦啦我好困不想做了', score: 100 },
                { id: 5, name: '导游5', brief: '啦啦啦我好困不想做了', score: 100 },
                { id: 6, name: '导游6', brief: '啦啦啦我好困不想做了', score: 100 },
                { id: 7, name: '导游7', brief: '啦啦啦我好困不想做了', score: 100 },
            ],
            addArticleData: {
                photoId: null,
                photoUrl: null,
            },
            rules: {
                gui: [
                    { id: 1, guide: '哇哇哇哇1', date: 123456, content: '', reply: '', score: 1, stage: 0, clickFlag: false, displayYes: true },
                    { id: 2, guide: '哇哇哇哇2', date: 123456, content: '', reply: '', score: 1, stage: 0, clickFlag: false, displayYes: true },
                    { id: 3, guide: '哇哇哇哇3', date: 123456, content: '', reply: '', score: 1, stage: 1, clickFlag: true, displayYes: true },
                    { id: 4, guide: '哇哇哇哇4', date: 123456, content: '', reply: '', score: 1, stage: 1, clickFlag: true, displayYes: true },
                ],
            },
        };
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        async getName(account) {
            return await getUserInfo({ account });
        },
        // 发布文章
        async submit() {
            // 获取表单里的值 调用接口
            // let res = this.form;
            // const r = await releaseArticle(res);
            // console.log(r);

            // 清空表单
            // this.form.title = "";
            // this.form.placeName = "";
            // this.form.province = "";
            // this.form.content = "";
            // this.form.pictureId = "";

            // 刷新页面
            // location.reload();
        },
        async uploadPhoto() {
            if (this.addArticleData.photoUrl == null) {
                let res = (await uploadPhoto({
                    token: util.getCookie('token'),
                    file: this.$refs.file.files[0]
                })).data;
                if (res.data.url == null) {
                    ElementUI.Message.error(res.message);
                } else {
                    this.addArticleData.photoUrl = res.data.url;
                    this.addArticleData.photoId = res.data.id;
                }
            } else {
                let res = (await reUploadPhoto({
                    token: util.getCookie('token'),
                    file: this.$refs.file.files[0],
                    id: this.addArticleData.photoId,
                })).data;
                if (res.flag) {
                    // 为了触发动态更新，给url重新赋值
                    let str = this.addGiftData.photoUrl;
                    this.addArticleData.photoUrl = '';
                    this.addArticleData.photoUrl = str;
                } else {
                    ElementUI.Message.error(res.message);
                }
            }
        },
        // 获取我的咨询
        async getMyConsult(rule) {
            let r = await getOwnConsult(rule);
            let consultList = r.data.data.consultList;
            // console.log(consultList);

            for (var i = 0; i < consultList.length; i++) {
                // 处理时间
                let date = util.getDateString(consultList[i].consultTime);
                consultList[i].date = date;

                // 通过account获取导游姓名
                const gui = await this.getName(consultList[i].account);
                let guideName = gui.data.data.username;
                consultList[i].guide = guideName;
                console.log(consultList);

                if (consultList[i].stage == 1) {
                    // 弹出评分对话框
                    consultList[i].clickFlag = true;
                }
                if (consultList[i].stage != 2) {
                    // 放入存储数组中
                    this.rules.gui.push(consultList[i]);
                    console.log(this.rules.gui);
                }
            }
        },
        async submitScore() {
            // 获取表单里的值
            let res = this.form3.name;
            console.log(res);

            // 调用接口 改变数据
            let da = {
                token: this.rule.token,
                id: this.rule.id,
                score: res,
            };
            const r = await scoreConsult(da);
            console.log(r);

            // 清空表单
            this.form.name = "";

            // 刷新页面
            location.reload();
        }
    },
    computed: {
        photoUrl() {
            return getPhotoUrl(this.addArticleData.photoUrl);
        }
    },
    async created() {
        this.getMyConsult(this.rule);
    },
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
    height: 465px;
}

/* 图片铺满 */
.image {
    min-width: 100%;
    min-height: 100%;
}

.tourTop {
    position: relative;
    overflow: hidden;
    background-color: blueviolet;
}

.tourTop h1 {
    float: left;
    /* background-color: aquamarine; */
}

.tourTop .photoBox {
    position: relative;
    display: inline-block;
    width: 238px;
    height: 150px;
    border: 1px solid #c0c4cc;
    border-radius: 5px;
    box-sizing: border-box;
    vertical-align: top;
}

.tourTop .photoBox > .top {
    position: absolute;
    left: 0px;
    right: 0px;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    /* background-color: pink; */
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    pointer-events: none;
}

.tourTop .photoBox::before {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    line-height: 150px;
    text-align: center;
    border-radius: 5px;
    color: #c0c4cc;
    background-color: #fff;
    content: "上传图片";
    pointer-events: none;
}

.tourTop .photoBox > input {
    height: 100%;
}

.write {
    float: left;
    margin-top: 3px;
    margin-left: 15px;
}

.select {
    position: absolute;
    float: left;
    right: 0;
}

.el-dropdown {
    vertical-align: top;
}

.el-dropdown + .el-dropdown {
    margin-left: 15px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.tourContent {
    height: 420px;
    /* margin-top: 20px; */
    background-color: saddlebrown;
}

/* 文章part */
.box {
    position: relative;
    float: left;
    width: 236px;
    height: 188px;
    /* margin: 0 42px; */
    margin-left: 42px;
    margin-right: 42px;
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
}

.box h3 {
    margin-bottom: 7px;
}

.boxProvince {
    margin-left: 5px;
    padding: 0 5px;
    background-color: darksalmon;
    border-radius: 5px;
}

.boxPlace {
    margin-left: 5px;
    padding: 0 5px;
    background-color: aquamarine;
    border-radius: 5px;
}

.boxAuthor {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    color: rgb(227, 227, 227);
    background-color: darkviolet;
}

.boxContent {
    font-size: 16px;
    margin-top: 10px;
    background-color: aqua;
    /* 省略文本 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.boxTime {
    position: absolute;
    bottom: 10px;
    background-color: rgb(252, 247, 175);
    border-radius: 5px;
}

.boxThumb {
    position: absolute;
    right: 0;
    bottom: 30px;
    background-color: royalblue;
}

/* 导游part */
.guideBox {
    position: relative;
    float: left;
    width: 200px;
    height: 150px;
    background-color: white;
    border-radius: 5px;
    margin: 20px 28px;
}

.guideBox h3 {
    text-align: center;
    background-color: saddlebrown;
}

.guideBox p {
    margin: 10px 5px;
    height: 64px;
    background-color: saddlebrown;
    /* 省略文本 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.guideBox span {
    position: absolute;
    right: 0;
    margin-top: 10px;
    background-color: saddlebrown;
}

.myConsults p {
    text-align: center;
    line-height: 64px;
    color: saddlebrown;
    background-color: aquamarine;
}

.myConsults span {
    position: absolute;
    left: 0;
    bottom: 20px;
    background-color: bisque;
}

/* 一起游 */
.together {
    height: 200px;
}

/* 页脚 */
.footer {
    height: 180px;
    background-color: rgb(252, 247, 175);
}

.footerCon {
    width: var(--baseWidth);
    height: 180px;
    margin: auto;
    background-color: salmon;
}
</style>