<template>
    <div class="all">
        <!-- 头部导航栏 -->
        <Header></Header>

        <!-- 导航 -->
        <el-tabs class="tab" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="待回复" name="first">
                <div class="consults">
                    <div class="consult">咨询</div>
                    <div class="consult">咨询</div>
                    <div class="consult">咨询</div>
                    <div class="consult">咨询</div>
                    <div class="consult">咨询</div>
                    <div class="consult">咨询</div>
                </div>

                <!-- 分页栏 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000"
                ></el-pagination>
            </el-tab-pane>

            <el-tab-pane label="已回复" name="second">2</el-tab-pane>

            <el-tab-pane label="已评分" name="third">3</el-tab-pane>
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
            currentPage: 5,
        };
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }

    },
};
</script>

<style scoped>
.tab {
    width: var(--baseWidth);
}

.consults {
    width: 100%;
    height: 100%;
}

.consult {
    float: left;
    margin-left: 40px;
    margin-top: 20px;
    width: 280px;
    height: 220px;
    background-color: pink;
    border-radius: 10%;
}

.paegs {
}
</style>