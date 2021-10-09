<template>
    <div class="shopRoot">
        <Header></Header>
        <div class="main">
            <div class="title">
                <div class="text">礼品商城</div>
                <div
                    v-if="user.isAdmin"
                    class="create beforeBtn"
                    @click="addGiftData.status = true"
                >添加礼品</div>
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
                        <div
                            v-if="user.isAdmin"
                            class="admin delete iconfont icon-shanchu"
                            @click="deleteClick(item)"
                        ></div>
                    </li>
                </ul>
            </div>
        </div>
        <Tips ref="tips"></Tips>
        <Dialog v-if="addressStatus">
            <div class="addressRoot">
                <div class="text">地址：</div>
                <input type="text" v-model="address" />
                <div class="submit beforeBtn" @click="exchangeSubmit">提交</div>
            </div>
        </Dialog>
        <Dialog v-if="addGiftData.status" :config="{style:{width: '400px', height: '400px'}}">
            <div class="addGiftRoot">
                <div class="title">添加礼品</div>
                <div class="form">
                    <div class="name">
                        <div class="text">礼品名称</div>
                        <input type="text" class="right" v-model="addGiftData.name" />
                    </div>
                    <div class="describe">
                        <div class="text">礼品描述</div>
                        <input type="text" class="right" v-model="addGiftData.describe" />
                    </div>
                    <div class="price">
                        <div class="text">礼品价格</div>
                        <input type="text" class="right" v-model="addGiftData.price" />
                    </div>
                    <div class="photo">
                        <div class="text">礼品配图</div>
                        <div class="photoBox">
                            <div class="top" :style="{backgroundImage: giftPhotoUrl}"></div>
                            <input type="file" ref="file" class="right" @change="uploadPhoto" />
                        </div>
                    </div>
                </div>
                <div class="control">
                    <div class="submit beforeBtn" @click="addGift">添加</div>
                    <div class="close beforeBtn" @click="addGiftData.status = false">取消</div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import Tips from 'components/content/Tips.vue';
import Dialog from 'components/content/Dialog.vue';
import { getAllGift, getGiftInfo, addExchangeGift, addGift, removeGift } from 'network/Shop.js';
import { getPhotoUrl, uploadPhoto, reUploadPhoto } from 'network/Public.js';
import { getOwnInfo } from 'network/Header.js';
import eui from 'plugins/ElementUI.js';

export default {
    name: 'Shop',
    data() {
        return {
            giftList: [],
            user: {
                isAdmin: false,
            },
            addressStatus: false,
            address: '',
            nowGift: null,
            addGiftData: {
                status: false,
                name: '',
                describe: '',
                price: null,
                photoId: null,
                photoUrl: null,
            }
        };
    },
    components: {
        Header,
        Tips,
        Dialog,
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
            }, () => {
                if (item.price > this.user.balance) {
                    eui.Message.error('你钱不够');
                } else {
                    this.addressStatus = true;
                    this.nowGift = item;
                }
            });
        },
        deleteClick(item) {
            this.$refs.tips.tips({
                title: '删除礼品',
                content: '确定要删除礼品' + item.name + '吗',
                submit: '确定',
                close: '取消'
            }, async () => {
                let res = (await removeGift({
                    token: util.getCookie('token'),
                    id: item.id,
                })).data;
                if (res.flag) {
                    location.reload();
                } else {
                    eui.Message.error(res.message);
                }
            });
        },
        async exchangeSubmit() {
            this.addressStatus = false;
            let res = (await addExchangeGift({
                token: util.getCookie('token'),
                gid: this.nowGift.id,
                address: this.address
            })).data;
            console.log(res);
            if (res.flag) {
                location.reload();
            } else {
                eui.Message.error(res.message);
            }
        },
        async uploadPhoto() {
            if (this.addGiftData.photoUrl == null) {
                let res = (await uploadPhoto({
                    token: util.getCookie('token'),
                    file: this.$refs.file.files[0]
                })).data;
                if (res.data.url == null) {
                    eui.Message.error(res.message);
                } else {
                    this.addGiftData.photoUrl = res.data.url;
                    this.addGiftData.photoId = res.data.id;
                }
            } else {
                let res = (await reUploadPhoto({
                    token: util.getCookie('token'),
                    file: this.$refs.file.files[0],
                    id: this.addGiftData.photoId,
                })).data;
                if (res.flag) {
                    // 为了触发动态更新，给url重新赋值
                    let str = this.addGiftData.photoUrl;
                    this.addGiftData.photoUrl = '';
                    this.addGiftData.photoUrl = str;
                } else {
                    eui.Message.error(res.message);
                }
            }
        },
        async addGift() {
            let res = (await addGift({
                token: util.getCookie('token'),
                name: this.addGiftData.name,
                describe: this.addGiftData.describe,
                price: this.addGiftData.price,
                pictureId: this.addGiftData.photoId,
            })).data;
            console.log(res);
            if (res.flag) {
                this.addGiftData.status = false;
                location.reload();
            } else {
                eui.Message.error(res.message);
            }
        },
    },
    computed: {
        giftPhotoUrl() {
            return getPhotoUrl(this.addGiftData.photoUrl);
        }
    },
    created() {
        this.loadGift();
        this.loadUserInfo();
    }
};
</script>

<style>
.shopRoot > .main {
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

.addressRoot {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    margin-top: 30px;
}

.addressRoot .text {
    width: 50px;
    text-align: right;
    line-height: 40px;
}

.addressRoot input {
    flex: 1;
    padding: 0px 10px;
}

.addressRoot .submit {
    position: relative;
    width: 60px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #666;
    cursor: pointer;
}

.addGiftRoot {
    width: 100%;
    height: 100%;
}

.addGiftRoot .title {
    font-size: 20px;
    text-align: center;
}

.addGiftRoot .form {
    width: 320px;
    margin: 20px auto;
}

.addGiftRoot .form > div {
    margin-top: 10px;
}

.addGiftRoot .form div .text {
    display: inline-block;
    margin-right: 10px;
    font-size: 18px;
}

.addGiftRoot .form div > input {
    width: 238px;
    border: 1px solid #666;
    border-radius: 5px;
    box-sizing: border-box;
    vertical-align: top;
}

.addGiftRoot .form div > input {
    height: 30px;
    padding: 0px 10px;
}

.addGiftRoot .form > .photo > .photoBox {
    position: relative;
    display: inline-block;
    width: 238px;
    height: 150px;
    border: 1px solid #666;
    border-radius: 5px;
    box-sizing: border-box;
    vertical-align: top;
}

.addGiftRoot .form > .photo > .photoBox > .top {
    position: absolute;
    left: 0px;
    right: 0px;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    /* background-color: pink; */
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    pointer-events: none;
}

.addGiftRoot .form > .photo > .photoBox::before {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    line-height: 150px;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    content: "上传图片";
    pointer-events: none;
}

.addGiftRoot .form > .photo > .photoBox > input {
    height: 100%;
}

.addGiftRoot .control {
    width: 320px;
    height: 40px;
    margin: auto;
}

.addGiftRoot .control > div {
    position: relative;
    width: 80px;
    padding: 5px;
    border-radius: 5px;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}

.addGiftRoot .control > .submit {
    float: left;
    background-color: #77a778;
}

.addGiftRoot .control > .close {
    float: right;
    background-color: #d897a2;
}
</style>