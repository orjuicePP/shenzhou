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
                        <div
                            class="consult noneR"
                            v-for="(item,index) in rules.noneReply"
                            @click="dialogFormVisible = true;getC(item)"
                        >
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
                        <div
                            class="consult alreadyRe"
                            v-for="(item,index) in rules.alreadyReply"
                            @click="dialogVisible = true;getAn(item)"
                        >
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
                        <div
                            class="consult grades"
                            v-for="(item,index) in rules.grade"
                            @click="dialogVisibles = true;getAn(item)"
                        >
                            <div class="ask">{{item.name}}:</div>
                            <div class="problem">{{item.content}}</div>
                            <div class="date">{{item.date}}</div>
                            <div class="score">评分：{{item.score}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <div v-if="guideInfo.score != -1" class="myScore">我的评分：{{guideInfo.score}}</div>
        </el-tabs>

        <!-- 回复咨询对话框 -->
        <el-dialog title="回答" :visible.sync="dialogFormVisible">
            <!-- 表单 -->
            <el-form :model="form">
                <el-form-item>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <!-- 按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;submit()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 查看回答对话框 -->
        <el-dialog
            title="你的回答"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span class="getAnswer">{{re}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 查看回答&评分对话框 -->
        <el-dialog
            title="你的回答"
            :visible.sync="dialogVisibles"
            width="30%"
            :before-close="handleClose"
        >
            <span>{{re}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisibles = false">确 定</el-button>
            </span>
        </el-dialog>

        <div class="full"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/content/Header.vue';
import { getConsults, replyConsult, getOwnGuideInfo } from "network/Guide.js";
import { getUserInfo } from "network/Public.js";
import util from "common/utils.js";
window.util = util;

export default {
    components: { Header },
    data() {
        return {
            re: '',
            answer: '',
            dialogFormVisible: false,
            dialogVisibles: false,
            dialogVisible: false,
            form: {
                name: '',
                region: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
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
            guideInfo: {},
        };
    },

    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
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
                let ycx = 10;
                while (ycx--) {
                    for (var i = 0; i < consultList.length; i++) {
                        // 处理时间
                        let date = util.getDateString(consultList[i].consultTime);
                        consultList[i].date = date;

                        // 通过account获取用户姓名
                        const userInfo = await this.getName(consultList[i].account);
                        let name = userInfo.data.data.username;
                        consultList[i].name = name;

                        // 待回复
                        if (consultList[i].stage == 0) {
                            this.rules.noneReply.push(consultList[i]);
                            // console.log(this.rules.noneReply);
                            // 已回复
                        } else if (consultList[i].stage == 1) {
                            this.rules.alreadyReply.push(consultList[i]);
                            // console.log(this.rules.alreadyReply);
                            // 已评分
                        } else if (consultList[i].stage == 2) {
                            this.rules.grade.push(consultList[i]);
                            // console.log(this.rules.grade);
                        }
                    }
                }
            }

        },

        // 获取点击的数组对象
        getC(item) {
            this.answer = item;
            console.log(this.answer.id);
        },

        // 提交表单
        async submit() {
            // 获取表单里的值
            let res = this.form.name;

            // 调用接口 改变数据
            let da = {
                token: this.rules.token,
                // id: this.rules.id,
                id: this.answer.id,
                reply: res,
            };
            const r = await replyConsult(da);
            console.log(r);

            // 清空表单
            this.form.name = "";

            // 刷新页面
            location.reload();
        },

        // 获取回复渲染至对话框
        getAn(item) {
            this.re = item.reply;
        },

        async loadGuideInfo() {
            let res = (await getOwnGuideInfo({
                token: this.rules.token,
            })).data.data;
            this.guideInfo = res;
        }
    },
    async created() {
        this.getCons(this.rules);
        this.loadGuideInfo();
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
    position: relative;
    width: var(--baseWidth);
    margin: 20px auto 50px;
}

.tab .myScore {
    position: absolute;
    top: -39px;
    right: 20px;
    height: 39px;
    line-height: 39px;
    font-size: 18px;
    color: #666;
    cursor: pointer;
}

.tab .myScore:hover {
    color: #000;
}

.tab .el-tabs__content {
    overflow: unset;
    padding: 30px;
}

.consults {
    overflow: hidden;
    margin: 0 auto;
}

.consult {
    position: relative;
    float: left;
    width: 282px;
    height: 220px;
    padding: 20px;
    margin-right: 30px;
    box-sizing: border-box;
    background-color: pink;
    border-radius: 10px;
}

.consult:nth-child(n + 5) {
    margin-top: 30px;
}

.consult:nth-child(4n) {
    margin-right: 0px;
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
    font-size: 20px;
    color: #333;
    margin-bottom: 5px;
}

.problem {
    font-size: 18px;
    /* background-color: blueviolet; */
    color: rgb(65, 78, 74);
    /* 溢出省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

.date {
    position: absolute;
    bottom: 20px;
    color: rgb(219, 150, 59);
    width: 140px;
}

.score {
    position: absolute;
    color: rgb(161, 77, 62);
    bottom: 20px;
    right: 20px;
}

.full {
    height: 1px;
}
</style>