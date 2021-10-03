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
                            <div class="ask">{{item.account}}:</div>
                            <div class="problem">{{item.content}}</div>
                            <div class="date">{{item.consultTime}}</div>
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
                            <div>{{item.account}}</div>
                            <div>{{item.content}}</div>
                            <div>{{item.consultTime}}</div>
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
                            <div>{{item.account}}</div>
                            <div>{{item.content}}</div>
                            <div>{{item.consultTime}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/content/Header.vue';
import { getConsults, replyConsult } from "network/Guide.js";
import util from "common/utils.js"
window.util = util;

export default {
    components: { Header },
    data() {
        return {
            activeName: 'first',
            rules: {
                id: util.getCookie("account"),
                token: util.getCookie("token"),
                reply: '',
                noneReply: [
                    { id: '1咨询1', account: 1, consultTime: 546151513, content: "吃饭了吗11111111111111111111111111111111111111111111", reply: "", score: 0, },
                    { id: '1咨询2', account: 2, consultTime: 546151513, content: "我饿了", reply: "", score: 0, },
                    { id: '1咨询3', account: 3, consultTime: 546151513, content: "吃饭吧", reply: "", score: 0, },

                ],
                alreadyReply: [
                    { id: '1咨询1', account: 1, consultTime: 546151513, content: "sndbsjkbdjksbdj", reply: "", score: 0, },
                    { id: '1咨询2', account: 2, consultTime: 546151513, content: "shagdhabdhab", reply: "", score: 0, },
                    { id: '1咨询3', account: 3, consultTime: 546151513, content: "cjsdbfjhsiuhfsn", reply: "", score: 0, },
                ],
                grade: [
                    { id: '1咨询1', account: 1, consultTime: 546151513, content: "sndbsjkbdjksbdj", reply: "", score: 0, },
                    { id: '1咨询2', account: 2, consultTime: 546151513, content: "shagdhabdhab", reply: "", score: 0, },
                    { id: '1咨询3', account: 3, consultTime: 546151513, content: "cjsdbfjhsiuhfsn", reply: "", score: 0, },
                ],
            },
        };
    },

    methods: {
        // 点击切换板块
        handleClick(tab, event) {
            console.log(tab, event);
        },
        editCons() {
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                    h('span', null, '123546 '),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },
        // 得到所有咨询
        async getCons(rules) {
            const res = await getConsults(rules);
            let consultList = res.data.data.consultList;
            console.log(consultList);

            var none = document.querySelector('.noneZero');
            var noneCons = document.querySelector('.noneCons');
            if (consultList.length == 0) {  // 暂无咨询
                none.style.display = 'block';
                noneCons.style.display = 'none';
            } else {
                for (var i = 0; i < consultList.length; i++) {
                    // 待回复
                    if (consultList[i].stage == 1) {
                        console.log(this.rules.noneReply);
                        this.rules.noneReply.push(consultList[i]);
                        // 已回复
                    } else if (consultList[i].stage == 2) {
                        console.log(this.rules.alreadyReply);
                        this.rules.alreadyReply.push(consultList[i]);
                        // 已评分
                    } else if (consultList[i].stage == 3) {
                        console.log(this.rules.grade);
                        this.rules.grade.push(consultList[i]);
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
    background-color: aquamarine;
}

.problem {
    font-size: 24px;
    height: 48px;
    background-color: blueviolet;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.date {
    background-color: burlywood;
}
</style>