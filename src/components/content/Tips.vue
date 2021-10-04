<template>
    <div class="tipsRoot">
        <div class="tipsBox" v-if="status">
            <div class="title">{{data.title}}</div>
            <div class="content">{{data.content}}</div>
            <div class="submit beforeBtn" @click="submit">{{data.submit}}</div>
            <div class="close beforeBtn" @click="close">{{data.close}}</div>
        </div>
        <div class="transparent" v-if="status"></div>
    </div>
</template>

<script>
export default {
    name: 'Tips',
    data() {
        return {
            status: false,
            data: {
                title: '标题',
                content: '内容',
                submit: '确认',
                close: '取消',
            },
            callback: null,
        };
    },
    methods: {
        tips(data, callback) {
            Object.assign(this.data, data);
            this.callback = callback;
            this.status = true;
        },
        submit() {
            this.callback();
            this.close();
        },
        close() {
            this.status = false;
        }
    }
}
</script>

<style scoped>
.tipsBox {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: 320px;
    height: 120px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 5px;
    transform: translate(-50%, -50%);
}

.title {
    text-align: center;
    font-weight: 700;
}

.content {
    margin-top: 10px;
    text-align: center;
}

.tipsBox .submit,
.tipsBox .close {
    position: relative;
    width: 60px;
    height: 30px;
    margin-top: 10px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
}

.submit {
    float: left;
    margin-left: 60px;
    background-color: rgb(119, 167, 120);
}

.close {
    float: right;
    margin-right: 60px;
    background-color: rgb(216, 151, 162);
}

.transparent {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>