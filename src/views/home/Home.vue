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
                            <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/"
                              
                                :on-change="handelOnChange"
                                :file-list="fileList"
                            >
                                <button>点击上传</button>
                            </el-upload>
                            <img v-if="audioUrl" :src="audioUrl" controls></img>
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
                <div class="box">
                    <span>大学英语词汇解析</span>
                    <div class="coll">
                        <p>华中科技大学</p>
                    </div>
                    <div class="number">
                        <div class="real">117375</div>
                        <div class="people"></div>
                    </div>
                </div>
            </div>
        </div>

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
        <div class="footer">
            <div></div>
        </div>

        <!-- 回到顶部 -->
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import ElementUI from "plugins/ElementUI.js";
import { getArticle, releaseArticle } from "network/Home.js";
import util from "common/utils.js"
window.util = util;

export default {
    components: { Header },

    data() {
        return {
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
            uploadUrl: "", // 上传录音请求URL
            audioUrl: "", //录音的URL
            fileList: [],
        };
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleClick() {
            alert('button click');
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
        handelOnChange(res, file) {
            if(res){
                console.log(file);
            }
            console.log(file);
            // if (res) {
            //     var reader = new FileReader();
            //     reader.readAsDataURL(res.raw);
            //     // reader.onload = (e) => {
            //     //     this.audioUrl = reader.result;
            //     // };
            // }
            // this.fileList = [file[file.length - 1]];
            // console.log(this.fileList);
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
    background-color: rgb(252, 247, 175);
}

/* 图片铺满 */
.image {
    min-width: 100%;
    min-height: 100%;
}

.tourTop {
    overflow: hidden;
    background-color: blueviolet;
}

.tourTop h1 {
    float: left;
    /* background-color: aquamarine; */
}

.write {
    float: left;
    margin-top: 3px;
    margin-left: 15px;
}

.select {
    float: left;
    margin-left: 978px;
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
    height: 200px;
    margin-top: 20px;
    background-color: blueviolet;
}

.box {
    float: left;
    width: 236px;
    height: 198px;
    margin-left: 20px;
    background-color: white;
}

.box span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: #000;
    font-size: 14px;
    font-weight: normal;
    width: 223px;
    height: 22px;
    line-height: 22px;
    padding-left: 13px;
}
.box img {
    width: 236px;
    height: 139px;
}
.box .coll {
    width: 152px;
    height: 17px;
    display: block;
    float: left;
    margin-top: 8px;
    margin-left: 13px;
}
.box .coll p {
    font-size: 12px;
    height: 17px;
    line-height: 17px;
    color: rgb(153, 153, 153);
}
.box .number {
    width: 65px;
    height: 17px;
    float: right;
    margin-top: 8px;
    margin-right: 5px;
}
.number .people {
    width: 15px;
    height: 14px;
    float: right;
    /* background-image: url(../img/sprite/sprite.png); */
    background-size: 90px;
    background-position: 0 0;
}
.number .real {
    text-align: right;
    margin-left: 5px;
    float: right;
    font-size: 12px;
    height: 17px;
    line-height: 17px;
    color: rgb(153, 153, 153);
}
</style>