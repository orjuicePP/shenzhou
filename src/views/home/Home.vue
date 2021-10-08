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
                <!-- <div class="select">
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
                </div>-->
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
                        @click="dialogFormVisible2 = true;getGuide(item)"
                    >
                        <h3>{{item.guide}}</h3>
                        <p>{{item.introduction}}</p>
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
                        <el-button
                            type="primary"
                            @click="dialogFormVisible2 = false;submitAsk()"
                        >确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 我的咨询 -->
                <el-tab-pane label="我的咨询" name="second">
                    <div
                        class="guideBox myConsults"
                        v-for="(item,index) in rules.gui"
                        @click="dialogFormVisible3 = true && item.clickFlag;getItem(item) "
                    >
                        <h3>{{item.guide}}</h3>
                        <div class="fillCon">{{item.content}}</div>
                        <p v-if="item.stage == 0">等待导游回答</p>
                        <p v-if="item.stage == 1">导游已回答，请点击评分</p>
                        <span>{{item.date}}</span>
                    </div>
                </el-tab-pane>

                <!-- 用户评分对话框 -->
                <el-dialog title="请给这位导游的回答评个分吧！" :visible.sync="dialogFormVisible3">
                    <el-form :model="form3">
                        <!-- 导游的回答 -->
                        <el-form-item label="导游的回答" :label-width="formLabelWidth">
                            <div>{{reply}}</div>
                        </el-form-item>

                        <!-- 评分框 -->
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
            </el-tabs>
        </div>

        <!-- 一起游 -->
        <div class="together">
            <!-- 标题 -->
            <div class="tourTop">
                <!-- 标题 -->
                <h1 class="title">一起游</h1>

                <!-- 发起一起游 -->
                <div class="write" @click="dialogTableVisibleTo = true">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        style="color: black; background-color: white; border-color: white;"
                    ></el-button>
                </div>

                <!-- 发起一起游对话框 -->
                <el-dialog title="发起一起游~" :visible.sync="dialogTableVisibleTo">
                    <el-form :model="formTo">
                        <el-form-item label="请输入除自身之外需要的人数" :label-width="formLabelWidth2">
                            <el-input v-model="formTo.pNumber" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="请输入起点" :label-width="formLabelWidth2">
                            <el-input v-model="formTo.departure" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="请输入终点" :label-width="formLabelWidth2">
                            <el-input v-model="formTo.destination" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="请输入出发时间" :label-width="formLabelWidth2">
                            <el-input v-model="formTo.dTime" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="请对本次一起游做出描述" :label-width="formLabelWidth2">
                            <el-input v-model="formTo.describe" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisibleTo = false">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="dialogTableVisibleTo = false;submitTo()"
                        >发 起</el-button>
                    </div>
                </el-dialog>

                <!-- 筛选器 -->
                <!-- <div class="select">
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
                </div>-->
            </div>

            <div>
                <el-tabs v-model="activeName2" @tab-click="handleClick">
                    <!-- 大热的一起游 -->
                    <el-tab-pane label="大热的一起游" name="first">
                        <div
                            class="togetherHot guideBox myConsults"
                            v-for="(item,index) in toget.hot"
                            @click="dialogVisibleJoin = true;getHot(item)"
                        >
                            <div style="text-align: center">{{item.use}}</div>
                            <h3>From:{{item.departure}}</h3>
                            <h3>To:{{item.destination}}</h3>
                            <p>{{item.describe}}</p>
                            <span class="num">还需{{item.pNumber}}人即可成团！</span>
                            <span>出发时间：{{item.date}}</span>
                        </div>

                        <!-- 加入一起游对话框 -->
                        <el-dialog
                            title="详情描述"
                            :visible.sync="dialogVisibleJoin"
                            width="30%"
                            :before-close="handleClose"
                        >
                            <span>{{describe}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisibleJoin = false">取 消</el-button>
                                <el-button
                                    type="primary"
                                    @click="dialogVisibleJoin = false;joinTo()"
                                >加 入</el-button>
                            </span>
                        </el-dialog>
                    </el-tab-pane>

                    <!-- 我参与的一起游 -->
                    <el-tab-pane label="我参与的一起游" name="second">
                        <div
                            class="togetherHot guideBox myConsults"
                            v-for="(item,index) in toget.join"
                        >
                            <div style="text-align: center">{{item.use}}</div>
                            <h3>From:{{item.departure}}</h3>
                            <h3>To:{{item.destination}}</h3>
                            <p>{{item.describe}}</p>
                            <span class="num">还需{{item.pNumber}}人即可成团！</span>
                            <span>出发时间：{{item.date}}</span>
                        </div>
                    </el-tab-pane>

                    <!-- 我发起的一起游 -->
                    <el-tab-pane label="我发起的一起游" name="third">
                        <div
                            class="togetherHot guideBox myConsults"
                            v-for="(item,index) in toget.Launch"
                        >
                            <div style="text-align: center">{{item.use}}</div>
                            <h3>From:{{item.departure}}</h3>
                            <h3>To:{{item.destination}}</h3>
                            <p>{{item.describe}}</p>
                            <span class="num">还需{{item.pNumber}}人即可成团！</span>
                            <span>出发时间：{{item.date}}</span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!-- 页脚 -->
        <div class="footer">
            <div class="footerCon">
                <div class="left">
                    <div class="logo"></div>
                    <div class="chickenSoup">由神秘组织银河护卫队推出，让每一个善良的地球人能拥有说走就走的旅行。</div>
                </div>
                <div class="middle">
                    <div class="title">关于我们</div>
                    <ul>
                        <li>
                            <a>常见问题</a>
                        </li>
                        <li>
                            <a>联系我们</a>
                        </li>
                        <li>
                            <a>开发团队</a>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="title">友情链接</div>
                    <ul class="clearfix">
                        <li>
                            <a href="https://pindao.hao123.com/go" target="_blank">特价旅游</a>
                        </li>
                        <li>
                            <a href="https://www.ctrip.com/" target="_blank">携程</a>
                        </li>
                        <li>
                            <a href="https://www.qunar.com/" target="_blank">去哪儿</a>
                        </li>
                        <li>
                            <a href="http://www.elong.com/" target="_blank">艺龙</a>
                        </li>
                        <li>
                            <a href="http://www.mafengwo.cn/" target="_blank">马蜂窝</a>
                        </li>
                        <li>
                            <a href="http://www.tuniu.com/" target="_blank">途牛旅行网</a>
                        </li>
                        <li>
                            <a href="http://www.lvmama.com/" target="_blank">驴妈妈旅游</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.cn/" target="_blank">Airbnb民宿</a>
                        </li>
                        <li>
                            <a href="https://www.booking.com/" target="_blank">Booking酒店</a>
                        </li>
                        <li>
                            <a href="https://www.fliggy.com/" target="_blank">飞猪旅行</a>
                        </li>
                        <li>
                            <a href="https://www.qyer.com/" target="_blank">穷游网</a>
                        </li>
                        <li>
                            <a href="https://www.ly.com/" target="_blank">同程旅行</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 回到顶部 -->
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import ElementUI from "plugins/ElementUI.js";
import { getUserInfo, getPhotoUrl, uploadPhoto, reUploadPhoto } from 'network/Public.js';
import {
    getArticles, releaseArticle, getOwnConsult, scoreConsult, getSomeGuide,
    initiateConsultation, getJoinCollage, getLaunchCollage, getSomeCollage,
    joinCollage, addCollage
} from "network/Home.js";
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
            },
            g: '',
            // 用户给导游评分
            dialogFormVisible3: false,
            form3: {
                name: '',
            },
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
                { id: 1, guide: '导游1', introduction: '啦啦啦我好困不想做了', score: 100 },
                { id: 2, guide: '导游2', introduction: '555555555555555', score: 100 },
                { id: 3, guide: '导游3', introduction: 'sdohfisdfisdbfhsdbfksdc', score: 100 },
            ],
            addArticleData: {
                photoId: null,
                photoUrl: null,
            },
            rules: {
                gui: [
                    // { id: 1, guide: '哇哇哇哇1', date: 123456, content: '啦啦啦我好困不想做了啦啦啦我好困不想做了', reply: '', score: 1, stage: 0, clickFlag: false, displayYes: true },
                    // { id: 4, guide: '哇哇哇哇4', date: 123456, content: 'hh', reply: '', score: 1, stage: 1, clickFlag: true, displayYes: true },
                ],
                answer: '',
            },
            reply: '',
            // 一起游
            activeName2: 'first',
            toget: {
                hot: [],
                join: [],
                Launch: []
            },
            dialogVisibleJoin: false,
            describe: '',
            toId: 0,
            dialogTableVisibleTo: false,
            formTo: {
                pNumber: '',
                departure: '',
                destination: '',
                dTime: '',
                describe: ''
            },
            formLabelWidth2: '200px',
        };
    },

    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
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
        // 获得被咨询的导游
        getGuide(item) {
            this.g = item.id;
            // console.log(this.g);
        },
        // 发起咨询
        async submitAsk() {
            // 获取表单里的值
            let res = this.form2.name;
            console.log(res);

            // 调用接口 改变数据
            let da = {
                token: this.rules.token,
                gid: this.g,
                content: res,
            };
            const r = await initiateConsultation(da);
            console.log(r);

            // 清空表单
            this.form.name = "";

            // 刷新页面
            location.reload();
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
                // console.log(consultList);

                if (consultList[i].stage == 1) {
                    // 弹出评分对话框
                    consultList[i].clickFlag = true;
                }
                if (consultList[i].stage != 2) {
                    // 放入存储数组中
                    this.rules.gui.push(consultList[i]);
                    // console.log(this.rules.gui);
                }
            }
        },
        // 获得点击的盒子
        getItem(item) {
            this.rules.answer = item;
            this.reply = item.reply;
        },
        // 给导游的回答评分
        async submitScore() {
            // 获取表单里的值
            let res = this.form3.name;
            // console.log(res);

            // 调用接口 改变数据
            let da = {
                token: this.rule.token,
                id: this.rules.answer.id,
                score: res,
            };
            const r = await scoreConsult(da);
            // console.log(r);

            // 清空表单
            this.form.name = "";

            // 刷新页面
            location.reload();
        },
        // 获取导游信息
        async getGuides() {
            let res = await getSomeGuide();
            let guideList = res.data.data.guideList;
            // console.log(guideList);
            // console.log(guideList[0].guideAccount);

            for (var i = 0; i < guideList.length; i++) {
                // 通过guideAccount获取导游姓名
                const gui = await this.getName(guideList[i].guideAccount);
                let guideName = gui.data.data.username;
                guideList[i].guide = guideName;
                // console.log(guideList);

                // 放入数组
                this.guides.push(guideList[i]);
                // console.log(this.guides);
            }
        },
        // 获取一起游
        async getSomeT() {
            let res = await getSomeCollage();
            let collageList = res.data.data.collageList;
            // console.log(collageList);

            for (var i = 0; i < collageList.length; i++) {
                // 处理时间
                let date = util.getDateString(collageList[i].dTime);
                collageList[i].date = date;

                // 通过account获取用户姓名
                const u = await this.getName(collageList[i].account);
                let uName = u.data.data.username;
                collageList[i].use = uName;

                // 放入存储数组中
                this.toget.hot.push(collageList[i]);
            }
            // console.log(this.toget.hot);
        },
        // 获取我参与的一起游
        async getJoinT(rule) {
            let r = await getJoinCollage(rule);
            // console.log(r);
            let collageList = r.data.data.collageList;
            // console.log(collageList);

            for (var i = 0; i < collageList.length; i++) {
                // 处理时间
                let date = util.getDateString(collageList[i].dTime);
                collageList[i].date = date;

                // 通过account获取用户姓名
                const u = await this.getName(collageList[i].account);
                let uName = u.data.data.username;
                collageList[i].use = uName;

                // 放入存储数组中
                this.toget.join.push(collageList[i]);
            }
            // console.log(this.toget.join);
        },
        // 获取我发起的一起游
        async getLaunchT(rule) {
            let r = await getLaunchCollage(rule);
            let collageList = r.data.data.collageList;
            // console.log(collageList);

            for (var i = 0; i < collageList.length; i++) {
                // 处理时间
                let date = util.getDateString(collageList[i].dTime);
                collageList[i].date = date;

                // 通过account获取用户姓名
                const u = await this.getName(collageList[i].account);
                let uName = u.data.data.username;
                collageList[i].use = uName;

                // 放入存储数组中
                this.toget.Launch.push(collageList[i]);
            }
            // console.log(this.toget.Launch);
        },
        // 加入一起游
        getHot(item) {
            this.toId = item.id;
            this.describe = item.describe;
            this.people = item.pNumber;
        },
        async joinTo() {
            let da = {
                token: this.rule.token,
                id: this.toId,
            };
            let r = await joinCollage(da);
        },
        // 发起一起游
        async () {
            let da = {
                token: this.rules.token,
                pNumber: this.formTo.pNumber,
                departure: this.formTo.departure,
                destination: this.formTo.destination,
                dTime: this.formTo.dTime,
                describe: this.formTo.describe,
            };
            const r = await addCollage(da);
            console.log(r);

            // 清空表单
            // this.form.name = "";

            // 刷新页面
            location.reload();
        },
    },
    computed: {
        photoUrl() {
            return getPhotoUrl(this.addArticleData.photoUrl);
        }
    },
    async created() {
        this.getMyConsult(this.rule);
        this.getGuides();
        this.getSomeT();
        this.getJoinT(this.rule);
        this.getLaunchT(this.rule);
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
.together {
    background-color: pink;
    height: 465px;
}

.homeGuide {
    background-color: rgb(201, 219, 219);
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
    background-color: rgb(213, 184, 240);
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
    background-color: rgb(204, 160, 129);
}

.guideBox p {
    margin: 10px 5px;
    height: 64px;
    /* background-color: saddlebrown; */
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
    /* background-color: saddlebrown; */
}

.myConsults .fillCon {
    margin-top: 5px;
    padding: 0 5px;
    background-color: bisque;
    height: 65px;
    /* 省略文本 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.myConsults p {
    position: absolute;
    bottom: 20px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    color: saddlebrown;
    /* background-color: aquamarine; */
}

.myConsults span {
    position: absolute;
    font-size: 14px;
    left: 0;
    bottom: 5px;
    /* background-color: bisque; */
}

/* 一起游 */
.together {
    background-color: rgb(252, 237, 218);
}

.togetherHot h3 {
    background-color: rgb(201, 219, 219);
}

.togetherHot .num {
    padding-left: 10px;
    width: 147px;
    bottom: 55px;
    border-radius: 10px;
    background-color: rgb(214, 193, 253);
}

.togetherHot p {
    -webkit-line-clamp: 1;
}

/* 页脚 */
.footer {
    margin-top: 55px;
    height: 200px;
    background-color: rgb(110, 107, 107);
}

.footerCon {
    width: var(--baseWidth);
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    margin: auto;
}

.footerCon .left {
    float: left;
}

.footerCon .left .logo {
    width: 180px;
    height: 60px;
    background-image: url("~assets/img/logo.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left center;
}

.footerCon .left .chickenSoup {
    margin-top: 10px;
    color: #ccc;
}

.footerCon .right {
    float: right;
    color: #ccc;
    width: 450px;
    margin-right: 80px;
}

.footerCon .right .title {
    font-size: 20px;
    color: #eee;
}

.footerCon .right ul {
    width: 100%;
    margin-top: 10px;
}

.footerCon .right ul li {
    float: left;
    width: 150px;
    margin-bottom: 5px;
}

.footerCon .right ul li a {
    width: 100%;
    font-size: 14px;
    color: #ccc;
}

.footerCon .right ul li a:hover {
    color: #ff5c38;
}

.footerCon .middle {
    float: right;
    color: #ccc;
    width: 150px;
}

.footerCon .middle .title {
    font-size: 20px;
    color: #eee;
}

.footerCon .middle ul {
    width: 100%;
    margin-top: 10px;
}

.footerCon .middle ul li {
    float: left;
    width: 150px;
    margin-bottom: 5px;
}

.footerCon .middle ul li a {
    width: 100%;
    font-size: 14px;
    color: #ccc;
}

.footerCon .middle ul li a:hover {
    color: #ff5c38;
    cursor: pointer;
}
</style>