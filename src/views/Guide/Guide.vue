<template>
    <div class="all">
        <!-- 头部导航栏 -->
        <Header></Header>

        <!-- 导航 -->
        <el-tabs type="border-card" class="tab" v-model="activeName" @tab-click="handleClick">
            <!-- 待回复 -->
            <el-tab-pane label="待回复" name="first">
                <div class="consults">
                    <div class="noneZero">暂无咨询</div>
                    <div class="noneCons">
                        <div class="consult noneR" v-for="(item,index) in rules.noneReply">
                            <div class="ask">{{item.name}}:</div>
                            <div class="problem">{{item.content}}</div>
                            <div class="date">{{item.date}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 已回复 -->
            <el-tab-pane label="已回复" name="second">
                <div class="consults">
                    <!-- <div class="noneZero">暂无咨询</div> -->
                    <div class="alCons">
                        <div class="consult alreadyRe" v-for="(item,index) in rules.alreadyReply">
                            <div class="ask">{{item.name}}:</div>
                            <div class="problem">{{item.content}}</div>
                            <div class="date">{{item.date}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 已评分 -->
            <el-tab-pane label="已评分" name="third">
                <div class="consults">
                    <!-- <div class="noneZero">暂无咨询</div> -->
                    <div class="allGrades">
                        <div class="consult grades" v-for="(item,index) in rules.grade">
                            <div class="ask">{{item.name}}:</div>
                            <div class="problem">{{item.content}}</div>
                            <div class="date">{{item.date}}</div>
                            <div class="score">评分：{{item.score}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- 遮罩层 -->
        <div class="mask"></div>
        <!-- 输入框 -->
        <div class="write">
            <div class="title">请回答：</div>
            <div class="el">
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    maxlength="100"
                    show-word-limit
                ></el-input>
            </div>
            <el-button type="info" @click="clean">取消</el-button>
            <el-button type="primary">确定</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/content/Header.vue';
import { getConsults, replyConsult } from "network/Guide.js";
import { getUserInfo } from "network/Public.js";
import util from "common/utils.js"
window.util = util;

export default {
    components: { Header },
    data() {
        return {
            textarea: '',
            activeName: 'first',
            rules: {
                id: util.getCookie("account"),
                token: util.getCookie("token"),
                reply: '',
                noneReply: [
                    // { id: '1咨询1', account: 1, consultTime: 546151513, content: "吃饭了吗有有有有有有有饭了吗有有有有有有有饭了吗有有有有有有有饭了吗有有有有有有有饭了吗有有有有有有有饭了吗有有有有有有有有有有有有有有有", reply: "", score: 0, },
                    // { id: '1咨询2', account: 2, consultTime: 546151513, content: "我饿了", reply: "", score: 0, },
                    // { id: '1咨询3', account: 3, consultTime: 546151513, content: "吃饭吧", reply: "", score: 0, },
                ],
                alreadyReply: [
                    // { id: '1咨询1', account: 1, consultTime: 546151513, content: "sndbsjkbdjksbdj", reply: "", score: 0, },
                    // { id: '1咨询2', account: 2, consultTime: 546151513, content: "shagdhabdhab", reply: "", score: 0, },
                    // { id: '1咨询3', account: 3, consultTime: 546151513, content: "cjsdbfjhsiuhfsn", reply: "", score: 0, },
                ],
                grade: [
                    // { id: '1咨询1', account: 1, consultTime: 546151513, content: "sndbsjkbdjksbdj", reply: "", score: 0, },
                    // { id: '1咨询2', account: 2, consultTime: 546151513, content: "shagdhabdhab", reply: "", score: 0, },
                    // { id: '1咨询3', account: 3, consultTime: 546151513, content: "cjsdbfjhsiuhfsn", reply: "", score: 0, },
                ],
            },
        };
    },

    methods: {
        clean() {
            textarea = '';
        },
        // 点击切换板块
        handleClick(tab, event) {
            console.log(tab, event);
        },
        async getName(account) {
            return await getUserInfo({ account });
        },
        // 得到所有咨询
        async getCons(rules) {
            const res = await getConsults(rules);
            let consultList = res.data.data.consultList;
            // console.log(consultList);

            var none = document.querySelector('.noneZero');
            var noneCons = document.querySelector('.noneCons');
            if (consultList.length == 0) {  // 暂无咨询
                none.style.display = 'block';
                noneCons.style.display = 'none';
            } else {
                for (var i = 0; i < consultList.length; i++) {
                    // 处理时间
                    let date = util.getDateString(consultList[i].consultTime);
                    consultList[i].date = date;

                    // 通过account获取用户姓名
                    const userInfo = await this.getName(consultList[i].account);
                    let name = userInfo.data.data.username;
                    consultList[i].name = name;
                    // console.log(consultList);

                    // 待回复
                    if (consultList[i].stage == 0) {
                        this.rules.noneReply.push(consultList[i]);
                        // console.log(this.rules.noneReply);
                        // 已回复
                    } else if (consultList[i].stage == 1) {
                        this.rules.alreadyReply.push(consultList[i]);
                        console.log(this.rules.alreadyReply);
                        // 已评分
                    } else if (consultList[i].stage == 2) {
                        this.rules.grade.push(consultList[i]);
                        console.log(this.rules.grade);
                    }
                }

            }

        },
    },
    async created() {
        this.getCons(this.rules);
    },
};
</script>

<style>
.el-button {
    margin-left: 340px;
}
.write {
    background-color: #fff;
    position: fixed;
    top: 200px;
    left: 500px;
    width: calc(100% - 1000px);
    height: calc(100% - 400px);
    z-index: 3;
    border-radius: 5px;
}

.title {
    font-size: 20px;
    /* background-color: blue; */
    margin: 30px;
    color: rgb(60, 64, 67);
}

.write .el {
    margin: 50px;
    background-color: aquamarine;
}

.mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.tab {
    width: var(--baseWidth);
    margin: 20px auto;
}

.consults {
    overflow: hidden;
    margin: 0 auto;
    width: 960px;
}

.consult {
    position: relative;
    float: left;
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 40px;
    width: 220px;
    height: 190px;
    background-color: pink;
    border-radius: 10%;
}

.noneR {
    background-color: rgb(252, 220, 223);
}

.alreadyRe {
    background-color: rgb(187, 230, 214);
}

.grades {
    background-color: rgb(199, 220, 251);
}

.pages {
    width: 450px;
    margin: 0 auto;
}

.el-tabs {
    border-radius: 2%;
}

.noneZero {
    display: none;
    width: 192px;
    font-size: 60px;
    color: rgb(222, 225, 230);
    letter-spacing: 36px;
    margin: 120px auto;
}

.ask {
    margin-top: 20px;
    margin-left: 6px;
    color: rgb(95, 9, 231);
}

.problem {
    font-size: 18px;
    /* background-color: blueviolet; */
    margin: 15px;
    color: rgb(65, 78, 74);
    /* 溢出省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.date {
    position: absolute;
    color: rgb(219, 150, 59);
    width: 140px;
    bottom: 33px;
    margin-left: 5px;
}

.score {
    position: absolute;
    color: rgb(161, 77, 62);
    bottom: 9px;
    right: 5px;
}
</style>