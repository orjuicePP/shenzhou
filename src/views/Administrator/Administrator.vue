<template>
    <div class="admin">
        <Header></Header>
        <div class="core">
            <div class="tabBar">
                <ul>
                    <li :class="getTabClass('guideApply')" @click="changeTab('guideApply')">导游申请</li>
                    <li :class="getTabClass('giftApply')" @click="changeTab('giftApply')">礼品兑换申请</li>
                </ul>
            </div>
            <div class="content">
                <div v-if="tabNow == 'guideApply'" class="guideApply">
                    <ul>
                        <li v-for="item in guideApplyList" :style="{backgroundColor: item.bgc}">
                            <div class="username">{{item.username}}</div>
                            <div class="introduction">{{item.introduction}}</div>
                            <div class="accept" @click="handleGA(item, true)">接受</div>
                            <div class="reject" @click="handleGA(item, false)">拒绝</div>
                            <div class="time">{{item.time}}</div>
                        </li>
                    </ul>
                </div>
                <div v-if="tabNow == 'giftApply'" class="giftApply">
                    <ul>
                        <li v-for="item in giftApplyList" :style="{backgroundColor: item.bgc}">
                            <div class="main">
                                <span class="username">{{item.username}}</span>
                                想要兑换商品
                                <span
                                    class="giftName"
                                >{{item.gift.data.name}}</span>
                                ，地址为
                                <span
                                    class="address"
                                >{{item.address}}</span>
                            </div>
                            <div class="time">申请时间：{{item.time}}</div>
                            <div class="control">
                                <div class="success" @click="handleGiA(item, true)">接受</div>
                                <div class="reject" @click="handleGiA(item, false)">拒绝</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/content/Header.vue';
import { getAllGuideApply, handleGuideApply, getAllGiftApply, handleGiftApply } from 'network/Administrator.js';
import { getUserInfo } from 'network/Public.js';
import { getGiftInfo } from 'network/Shop.js';
import eui from 'plugins/ElementUI.js';

export default {
    name: 'Administrator',
    data() {
        return {
            tabNow: 'guideApply',
            guideApplyList: [],
            giftApplyList: [],
        };
    },
    components: {
        Header,
    },
    async created() {
        this.loadGA();
        this.loadGiA();
    },
    methods: {
        getTabClass(tab) {
            if (tab == this.tabNow) {
                return ['now'];
            } else {
                return [];
            }
        },
        changeTab(tab) {
            this.tabNow = tab;
        },
        async loadGA() {
            let res = (await getAllGuideApply({
                token: util.getCookie('token')
            })).data;
            res.data.guideApplyList.sort(function (a, b) {
                return a.applyTime < b.applyTime ? 1 : -1;
            });
            for (let guideApply of res.data.guideApplyList) {
                let ga = {};
                ga.id = guideApply.id;
                ga.username = (await getUserInfo({ account: guideApply.account })).data.data.username;
                ga.introduction = guideApply.introduction;
                ga.time = util.getDateString(guideApply.applyTime);
                ga.bgc = util.randomColor(220, 240);
                this.guideApplyList.push(ga);
            }
        },
        async handleGA(item, status) {
            let res = (await handleGuideApply({
                token: util.getCookie('token'),
                id: item.id,
                handle: status
            })).data;
            if (res.flag) {
                eui.Message.success(res.message);

                // 删除点击的元素
                let newArr = [];
                for (let i = 0; i < this.guideApplyList.length; i++) {
                    if (item != this.guideApplyList[i]) {
                        newArr.push(this.guideApplyList[i]);
                    }
                }
                this.guideApplyList = newArr;
            } else {
                eui.Message.error(res.message);
            }
        },
        async loadGiA() {
            let res = (await getAllGiftApply({
                token: util.getCookie('token'),
            })).data;
            for (let giftApply of res.data.exchangeGiftList) {
                let gift = (await getGiftInfo({
                    token: util.getCookie('token'),
                    id: giftApply.gid
                })).data;
                this.giftApplyList.push({
                    ...giftApply,
                    username: (await getUserInfo({
                        account: giftApply.account
                    })).data.data.username,
                    time: util.getDateString(giftApply.eTime),
                    bgc: util.randomColor(220, 240),
                    gift
                });
            }
        },
        async handleGiA(item, status) {
            let res = (await handleGiftApply({
                token: util.getCookie('token'),
                id: item.id,
                status: status ? 1 : -1
            })).data;
            if (res.flag) {
                eui.Message.success(res.message);

                // 删除点击的元素
                let newArr = [];
                for (let i = 0; i < this.giftApplyList.length; i++) {
                    if (item != this.giftApplyList[i]) {
                        newArr.push(this.giftApplyList[i]);
                    }
                }
                this.giftApplyList = newArr;
            } else {
                eui.Message.error(res.message);
            }
        }
    }
};
</script>

<style scoped>
.admin {
    width: 100%;
    height: 100%;
}

.core {
    width: var(--baseWidth);
    margin: 50px auto 0px;
}

.core > .tabBar {
    --tabHeight: 50px;
    height: var(--tabHeight);
}

.core > .tabBar > ul {
    height: 100%;
}

.core > .tabBar > ul > li {
    float: left;
    height: 100%;
    padding: 0px 20px;
    line-height: var(--tabHeight);
    border-radius: 20px 20px 0px 0px;
    background-color: #f3f3f3;
    cursor: pointer;
}

.core > .tabBar > ul > li:hover {
    background-color: #fafafa;
}

.core > .tabBar > ul > .now {
    background-color: #fff;
}

.core > .tabBar > ul > .now:hover {
    background-color: #fff;
}

.core > .content {
    height: 540px;
    padding: 20px;
    border-radius: 0px 5px 5px 5px;
    box-sizing: border-box;
    background-color: #fff;
}

.core > .content > .guideApply {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow-y: scroll;
}

.core > .content > .guideApply::-webkit-scrollbar {
    display: none;
}

.core > .content > .guideApply > ul {
    width: 100%;
    column-count: 4;
    column-gap: 20px;
}

.core > .content > .guideApply > ul > li {
    display: inline-block;
    position: relative;
    break-inside: avoid;
    width: 300px;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
    cursor: default;
}

.core > .content > .guideApply > ul > li .username {
    font-size: 20px;
    margin-bottom: 10px;
}

.core > .content > .guideApply > ul > li .introduction {
    text-indent: 2em;
    margin-bottom: 36px;
    color: #333;
}

.core > .content > .guideApply > ul > li .time {
    position: absolute;
    left: 15px;
    bottom: 15px;
    font-size: 12px;
    font-weight: 700;
    color: #333;
}

.core > .content > .guideApply > ul > li .accept,
.core > .content > .guideApply > ul > li .reject {
    position: absolute;
    bottom: 15px;
    width: 50px;
    height: 24px;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    cursor: pointer;
}

.core > .content > .guideApply > ul > li .accept::before,
.core > .content > .guideApply > ul > li .reject::before {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    content: "";
}

.core > .content > .guideApply > ul > li .accept:hover::before,
.core > .content > .guideApply > ul > li .reject:hover::before {
    display: none;
}

.core > .content > .guideApply > ul > li .accept {
    right: 72px;
    background-color: rgb(119, 167, 120);
}

.core > .content > .guideApply > ul > li .reject {
    right: 15px;
    background-color: rgb(216, 151, 162);
}

.core > .content > .giftApply {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.core > .content > .giftApply::-webkit-scrollbar {
    display: none;
}

.core > .content > .giftApply > ul {
    width: 100%;
}

.core > .content > .giftApply > ul > li {
    --galiHeight: 80px;

    position: relative;
    width: 100%;
    height: var(--galiHeight);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 10px;
}

.core > .content > .giftApply > ul > li > .main {
    font-size: 20px;
    width: 800px;
    height: 100%;
    padding-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: calc(var(--galiHeight) - 20px);
    color: #666;
}

.core > .content > .giftApply > ul > li > .main > .username,
.core > .content > .giftApply > ul > li > .main > .giftName {
    color: #000;
}

.core > .content > .giftApply > ul > li > .main > .username:hover,
.core > .content > .giftApply > ul > li > .main > .giftName:hover {
    color: #ff5c38;
    cursor: pointer;
}

.core > .content > .giftApply > ul > li > .time {
    position: absolute;
    top: 10px;
    left: 840px;
    height: calc(100% - 20px);
    line-height: calc(var(--galiHeight) - 20px);
}

.core > .content > .giftApply > ul > li > .control {
    position: absolute;
    top: calc((100% - 30px) / 2);
    right: 20px;
    width: 110px;
    height: 30px;
}

.core > .content > .giftApply > ul > li > .control > div {
    position: relative;
    width: 50px;
    height: 100%;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}

.core > .content > .giftApply > ul > li > .control > div::before {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    content: "";
}

.core > .content > .giftApply > ul > li > .control > div:hover::before {
    display: none;
}

.core > .content > .giftApply > ul > li > .control > .success {
    float: left;
    background-color: rgb(119, 167, 120);
}

.core > .content > .giftApply > ul > li > .control > .reject {
    float: right;
    background-color: rgb(216, 151, 162);
}
</style>