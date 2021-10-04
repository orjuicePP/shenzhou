<template>
    <div class="shopRoot">
        <Header></Header>
        <div class="main">
            <div class="title">
                <div class="text">礼品商城</div>
                <div v-if="user.isAdmin" class="create beforeBtn">添加礼品</div>
            </div>
            <div class="content">
                <ul class="clearfix">
                    <li v-for="item in giftList">
                        <div class="name">{{item.name}}</div>
                        <div class="photo" :style="{backgroundImage: item.bgi}"></div>
                        <div class="describe">{{item.describe}}</div>
                        <div class="price beforeBtn" @click="exchangeClick(item)">
                            {{item.price}}
                            <span class="iconfont icon-dashang"></span>
                        </div>
                        <div v-if="user.isAdmin" class="admin edit iconfont icon-bianji"></div>
                        <div v-if="user.isAdmin" class="admin delete iconfont icon-shanchu"></div>
                    </li>
                </ul>
            </div>
        </div>
        <Tips ref="tips"></Tips>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import Tips from 'components/content/Tips.vue';
import { getAllGift, getGiftInfo, addExchangeGift } from 'network/Shop.js';
import { getPhotoUrl } from 'network/Public.js';
import { getOwnInfo } from 'network/Header.js';

export default {
    name: 'Shop',
    data() {
        return {
            giftList: [],
            user: {
                isAdmin: false,
            },
        };
    },
    components: {
        Header,
        Tips,
    },
    methods: {
        async loadGift() {
            let idList = (await getAllGift({
                token: util.getCookie('token')
            })).data.data.idList;
            for (let id of idList) {
                let giftInfo = (await getGiftInfo({
                    token: util.getCookie('token'),
                    id
                })).data.data;
                giftInfo.bgi = getPhotoUrl(giftInfo.photo);
                giftInfo.id = id;
                this.giftList.push(giftInfo);
            }
        },
        async loadUserInfo() {
            let infoData = (await getOwnInfo({
                token: util.getCookie('token')
            })).data;
            this.user = infoData.data;
            this.user.account = util.getCookie('account');
        },
        exchangeClick(item) {
            this.$refs.tips.tips({
                title: '兑换礼品',
                content: '确定要兑换礼品' + item.name + '吗',
                submit: '确定',
                close: '取消'
            }, async function () {
                // let res = (await addExchangeGift({

                // })).data;
                console.log(item);
            });
        }
    },
    created() {
        this.loadGift();
        this.loadUserInfo();
    }
};
</script>

<style>
.main {
    width: var(--baseWidth);
    margin: 30px auto 0px;
}

.main > .title {
    position: relative;
    height: 40px;
}

.main > .title > .text {
    font-size: 24px;
}

.main > .title > .create {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100px;
    height: 100%;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    /* background-color: #f0ad4e; */
    background-color: #666;
    cursor: pointer;
}

.main > .content {
    width: 100%;
    margin-top: 20px;
}

.main > .content > ul {
}

.main > .content > ul > li {
    position: relative;
    float: left;
    width: 290px;
    padding: 15px;
    margin-right: 40px;
    margin-bottom: 40px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: #fff;
}

.main > .content > ul > li:nth-child(4n) {
    margin-right: 0px;
}

.main > .content > ul > li > .name {
    font-size: 18px;
}

.main > .content > ul > li > .photo {
    width: 100%;
    height: 150px;
    margin: 10px 0px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.main > .content > ul > li > .describe {
    width: 180px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.main > .content > ul > li > .price {
    position: absolute;
    bottom: 15px;
    right: 15px;
    height: 24px;
    padding: 0px 10px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    background-color: #f0ad4e;
    cursor: pointer;
}

.main > .content > ul > li > .admin {
    position: absolute;
    top: 15px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    color: #666;
    cursor: pointer;
}

.main > .content > ul > li > .edit {
    right: 50px;
    font-size: 24px;
}

.main > .content > ul > li > .edit:hover {
    color: #000;
}

.main > .content > ul > li > .delete {
    right: 15px;
    font-size: 28px;
}

.main > .content > ul > li > .delete:hover {
    color: #ff5c38;
}
</style>