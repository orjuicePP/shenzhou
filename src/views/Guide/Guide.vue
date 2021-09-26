<template>
    <div class="all">
        <!-- 头部导航栏 -->
        <Header></Header>

        <!-- 导航 -->
        <el-tabs class="tab" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>

        <!-- <div class="top">
            <span class="demonstration title">导游今天也努力工作了</span>
            <span class="demonstration self" style="color: white">我的评分：</span> 
        </div>-->

        <!-- <div style="margin-top: 5px">
            <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4">
                    <div>
                        <el-menu
                            default-active="1"
                            class="el-menu-vertical-demo"
                            style="min-height: 800px"
                        >
                            <el-menu-item index="1">
                                <i class="el-icon-message"></i>待回复
                            </el-menu-item>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>已回复
                            </el-menu-item>
                            <el-menu-item index="3">
                                <i class="el-icon-setting"></i>已评分
                            </el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20">
                    <div>
                        <div
                            style="
                border: 1px solid #a6a6a6;
                border-radius: 6px;
                padding: 5px;
                margin: 2px;
                background-color: white;
              "
                        >
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item
                                    :key="item.index"
                                    v-for="item in breadcrumbItems"
                                >{{ item }}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>

                    <div style="margin-top: 10px">
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-row>
        </div>-->
    </div>
</template>

<script type="text/ecmascript-6">
import Header from '../../components/content/Header.vue';

export default {
    components: { Header },
    data() {
        return {
            activeName: 'first'
            // searchCriteria: "",
            // breadcrumbItems: ["导游"],
        };
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
        // handleIconClick(ev) {
        //     console.log(ev);
        // },

    },
};
</script>

<style scoped>
.tab {
    
}
/* .all {
    background-color: #ebebeb;
    min-height: 800px;
}

.top {
    width: 100%;
    height: 50px;
    background-color: #636363;
    overflow: hidden;
} 

.title {
    float: left;
    padding-top: 15px;
    color: white;
    margin-left: 1%;
}

.self {
    float: right;
    padding-top: 10px;
    margin-right: 1%;
} */
</style>