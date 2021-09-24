<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="待回复" name="first">
                <div class="consult">咨询小窗</div>
            </el-tab-pane>
            <el-tab-pane label="已回复" name="second">已回复</el-tab-pane>
            <el-tab-pane label="已评分" name="third">已评分</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            
        };
    },
};
</script>

<style scoped>
.consult {
    width: 400px;
    height: 200px;
    background-color: cornflowerblue;
}
</style>