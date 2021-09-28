<template>
    <div class="all">
        <!-- 头部导航栏 -->
        <Header></Header>

        <!-- 导航 -->
        <el-tabs class="tab" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="待回复" name="first">
                <div class="consults">
                    <div class="consult" v-for="(item,index) in noneReply">{{item.name}}</div>
                </div>

                <!-- 分页栏 -->
                <div class="pages">
                    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                </div>
            </el-tab-pane>

            <el-tab-pane label="已回复" name="second">
                <div class="consults">
                    <div class="consult" v-for="(item,index) in alreadyReply">{{item.name}}</div>
                </div>

                <!-- 分页栏 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000"
                    class="pages"
                ></el-pagination>
            </el-tab-pane>

            <el-tab-pane label="已评分" name="third">
                <div class="consults">
                    <div class="consult" v-for="(item,index) in grade">{{item.name}}</div>
                </div>

                <!-- 分页栏 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000"
                    class="pages"
                ></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from '../../components/content/Header.vue';

export default {
    components: { Header },
    data() {
        return {
            activeName: 'first',
            noneReply: [
                { name: '咨询1', index: 1 },
                { name: '咨询2', index: 2 },
                { name: '咨询3', index: 3 },
                { name: '咨询4', index: 4 },
                { name: '咨询5', index: 5 },
                { name: '咨询6', index: 6 },
            ],
            alreadyReply: [
                { name: '咨询1', index: 1 },
                { name: '咨询2', index: 2 },
                { name: '咨询3', index: 3 },
                { name: '咨询4', index: 4 },
                { name: '咨询5', index: 5 },
                { name: '咨询6', index: 6 },
            ],
            grade: [
                { name: '咨询1', index: 1 },
                { name: '咨询2', index: 2 },
                { name: '咨询3', index: 3 },
                { name: '咨询4', index: 4 },
                { name: '咨询5', index: 5 },
                { name: '咨询6', index: 6 },
            ],
        };
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },

    },
};
</script>

<style>
.tab {
    width: var(--baseWidth);
    margin: 10px auto;
}

.consults {
    height: 460px;
    margin-left: 160px;
}

.consult {
    float: left;
    margin-left: 100px;
    margin-bottom: 40px;
    width: 220px;
    height: 190px;
    background-color: pink;
    border-radius: 10%;
}

.pages {
    width: 450px;
    margin: 0 auto;
}
</style>