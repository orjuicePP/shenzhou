<template>
    <div class="headerRoot">
        <div class="header">
            <div class="headerMain">
                <div class="logo" @click="toPage('/home')"></div>
                <div class="userInfo">
                    <div class="photo" :style="{backgroundImage: `url('${hpUrl}')`}"></div>
                    <div class="username">{{user.username}}</div>
                    <div class="otherInfo">
                        <i></i>
                        <div class="baseInfo">
                            <div class="left" :style="{backgroundImage: `url('${hpUrl}')`}">
                                <div class="upload">
                                    <span>更换</span>
                                    <input type="file" ref="file" @change="uploadHP" />
                                </div>
                            </div>
                            <div class="right">
                                <div class="username">{{user.username}}</div>
                                <div class="account">账号：{{user.account}}</div>
                            </div>
                        </div>
                        <div class="experience">
                            <div class="level">Lv{{user.level}}</div>
                            <div class="number">{{user.experience}}/{{expLimit}}</div>
                            <div class="bar">
                                <div class="inner" :style="{width: `${getExpPercentage()}%`}"></div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="left" @click="editInfoOpen">编辑信息</div>
                            <div class="right" @click="toPage('/')">切换账号</div>
                        </div>
                    </div>
                </div>
                <div class="shop">金{{user.balance}}</div>
                <div v-if="user.isAdmin" class="admin" @click="toPage('/administrator')">管理员页</div>
                <div v-if="user.isGuide" class="guide" @click="toPage('/guide')">导游页</div>
            </div>
            <div class="editInfo" v-if="editInfoData.status">
                <div class="title">修改个人信息</div>
                <p>
                    <span>用户昵称：</span>
                    <input type="text" v-model="editInfoData.username" />
                </p>
                <p>
                    <span>其他信息：</span>
                    <textarea v-model="editInfoData.other"></textarea>
                </p>
                <div class="bottom">
                    <div class="submit" @click="editInfoSumbit">确定</div>
                    <div class="cancel" @click="editInfoClose">取消</div>
                </div>
            </div>
            <div class="transparent" v-if="editInfoData.status"></div>
        </div>
        <div class="fill"></div>
    </div>
</template>

<script>
import { status } from 'network/request.js';
import { getOwnInfo, getExperienceTable, uploadHeadPortrait } from 'network/Header.js';

export default {
    name: 'Header',
    data() {
        return {
            experienceTable: [],

            user: {
                username: '杨超旭', // 用户名 
                account: '1808078515', // 用户账号
                other: '暂无', // 其它信息
                balance: 0, //余额
                experience: 0, // 经验值
                level: 1, // 经验等级
                headPortraitUrl: null, // 头像路径
                isAdmin: true, // 是否为管理员
                isGuide: true, // 是否为导游
            },

            editInfoData: {
                status: false,
                username: '',
                other: '',
            }
        };
    },
    async created() {
        let etData = (await getExperienceTable({
            token: util.getCookie('token')
        })).data;
        this.experienceTable = etData.data.experienceTable;

        let infoData = (await getOwnInfo({
            token: util.getCookie('token')
        })).data;
        this.user.account = util.getCookie('account');
        this.user.username = infoData.data.username;
        this.user.experience = infoData.data.experience;
        this.user.headPortraitUrl = infoData.data.headPortraitUrl;
        this.user.level = infoData.data.level;
        this.user.other = infoData.data.other;
        this.user.balance = infoData.data.balance;
    },
    computed: {
        expLimit() {
            return this.experienceTable[this.user.level - 1];
        },
        hpUrl() {
            if (this.user.headPortraitUrl != null) {
                let pre = '/file?url=';
                if (status == 'build') {
                    pre = '/api' + pre;
                }
                return pre + this.user.headPortraitUrl + '&random=' + parseInt(Math.random() * 100000000);
            } else {
                return null;
            }
        }
    },
    methods: {
        getExpPercentage() {
            return this.user.experience / this.expLimit * 100;
        },
        async uploadHP() {
            let res = (await uploadHeadPortrait({
                token: util.getCookie('token'),
                file: this.$refs.file.files[0]
            })).data;
            if (res.data.url == null) {
                // 为了触发动态更新，给url重新赋值
                let str = this.user.headPortraitUrl;
                this.user.headPortraitUrl = '';
                this.user.headPortraitUrl = str;
            } else {
                this.user.headPortraitUrl = res.data.url;
            }
        },
        editInfoOpen() {
            this.editInfoData.status = true;
            this.editInfoData.username = this.user.username;
            this.editInfoData.other = this.user.other;
        },
        editInfoSumbit() {
            console.log(this.editInfoData.username);
            console.log(this.editInfoData.other);
        },
        editInfoClose() {
            this.editInfoData.status = false;
        },
        toPage(page) {
            if (page != this.$route.path) {
                this.$router.push(page);
            }
        },
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: var(--headerHeight);
    position: fixed;
    background-color: rgba(255, 255, 255, 0.8);
}

.headerMain {
    --userInfoHeight: 40px;

    width: var(--baseWidth);
    height: 100%;
    margin: auto;
}

.headerMain .logo {
    float: left;
    width: 180px;
    height: 100%;
    background-image: url("~assets/img/logo.png");
    background-repeat: no-repeat;
    background-size: 84%;
    background-position: center center;
    cursor: pointer;
}

.headerMain .userInfo {
    position: relative;
    float: right;
    height: var(--userInfoHeight);
    margin-top: calc((var(--headerHeight) - var(--userInfoHeight)) / 2);
    cursor: pointer;
}

.headerMain .userInfo .photo {
    float: left;
    width: var(--userInfoHeight);
    height: var(--userInfoHeight);
    border-radius: 20px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.headerMain .userInfo > .username {
    float: right;
    padding: 0px 0px 0px 10px;
    font-size: 24px;
    line-height: var(--userInfoHeight);
}

.headerMain .userInfo .otherInfo {
    --contentBGC: #fff;
    --shadowC: #999;

    display: none;
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 200px;
    padding: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px var(--shadowC);
    background-color: var(--contentBGC);
    cursor: default;
}

.headerMain .userInfo:hover .otherInfo {
    display: block;
}

.headerMain .userInfo .otherInfo::before {
    position: absolute;
    top: -10px;
    left: 0px;
    width: 100%;
    height: 10px;
    content: "";
}

.headerMain .userInfo .otherInfo i {
    --size: 16px;

    position: absolute;
    right: 30px;
    top: calc(0px - var(--size));
    width: var(--size);
    height: var(--size);
}

.headerMain .userInfo .otherInfo i::before,
.headerMain .userInfo .otherInfo i::after {
    position: absolute;
    width: 0;
    height: 0;
    border: calc(var(--size) / 2) solid transparent;
    content: "";
}

.headerMain .userInfo .otherInfo i::before {
    top: 0px;
    border-bottom-color: var(--shadowC);
}

.headerMain .userInfo .otherInfo i::after {
    top: 1px;
    border-bottom-color: var(--contentBGC);
}

.headerMain .userInfo .otherInfo .baseInfo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    height: 40px;
}

.headerMain .userInfo .otherInfo .baseInfo .left {
    position: relative;
    width: 40px;
    border-radius: 20px;
    background-color: pink;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;
}

.headerMain .userInfo .otherInfo .baseInfo .left .upload {
    display: none;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 16px;
    cursor: pointer;
}

.headerMain .userInfo .otherInfo .baseInfo .left:hover .upload {
    display: block;
}

.headerMain .userInfo .otherInfo .baseInfo .left .upload span {
    display: block;
    font-size: 10px;
    text-align: center;
    background-color: rgba(51, 51, 51, 0.5);
    color: #eee;
    pointer-events: none;
}

.headerMain .userInfo .otherInfo .baseInfo .left .upload input {
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    cursor: pointer;
}

.headerMain .userInfo .otherInfo .baseInfo .right {
    flex: 1;
    padding-left: 10px;
}

.headerMain .userInfo .otherInfo .baseInfo .right .username {
    height: 22px;
    font-size: 16px;
    line-height: 22px;
}

.headerMain .userInfo .otherInfo .baseInfo .right .account {
    font-size: 12px;
}

.headerMain .userInfo .otherInfo .experience {
    position: relative;
    width: 100%;
    height: 24px;
    margin-top: 5px;
}

.headerMain .userInfo .otherInfo .experience .level {
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 12px;
    color: #ff5c38;
}

.headerMain .userInfo .otherInfo .experience .number {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 12px;
    color: #333;
}

.headerMain .userInfo .otherInfo .experience .bar {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: #ccc;
}

.headerMain .userInfo .otherInfo .experience .bar .inner {
    width: 50%;
    height: 100%;
    border-radius: 5px;
    background-color: #ff5c38;
}

.headerMain .userInfo .otherInfo .bottom {
    margin-top: 10px;
    /* border-top: 1px solid #666; */
}

.headerMain .userInfo .otherInfo .bottom div {
    font-size: 13px;
    cursor: pointer;
    color: #555;
}

.headerMain .userInfo .otherInfo .bottom div:hover {
    color: #000;
}

.headerMain .userInfo .otherInfo .bottom .left {
    float: left;
}

.headerMain .userInfo .otherInfo .bottom .right {
    float: right;
}

.headerMain .shop {
    float: right;
    width: 60px;
    height: 100%;
    line-height: var(--headerHeight);
    color: #333;
    cursor: pointer;
}

.headerMain .shop:hover {
    color: #ff5c38;
}

.headerMain .admin,
.headerMain .guide {
    float: left;
    padding: 0px 20px;
    height: 100%;
    line-height: var(--headerHeight);
    color: #666;
    cursor: pointer;
}

.headerMain .admin:hover,
.headerMain .guide:hover {
    color: #000;
}

.editInfo {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: 360px;
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px #fff;
    background-color: #fff;
    transform: translate(-50%, -50%);
}

.editInfo .title {
    font-size: 24px;
    text-align: center;
    margin: 10px 0px 20px;
}

.editInfo p {
    margin-top: 10px;
    text-align: center;
}

.editInfo p span {
    display: inline-block;
    font-size: 18px;
    height: 30px;
}

.editInfo p input {
    width: 200px;
    height: 30px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 0px 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Microsoft YaHei";
}

.editInfo p textarea {
    width: 200px;
    height: 80px;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #333;
    border-radius: 5px;
    vertical-align: text-top;
    font-size: 16px;
    font-family: "Microsoft YaHei";
}

.editInfo p textarea::-webkit-scrollbar {
    display: none;
}

.editInfo .bottom {
    --bottomHeight: 40px;

    width: 240px;
    height: var(--bottomHeight);
    margin: 20px auto 10px;
}

.editInfo .bottom div {
    position: relative;
    width: 80px;
    height: 100%;
    border-radius: 5px;
    font-size: 20px;
    text-align: center;
    line-height: var(--bottomHeight);
    color: #fff;
    cursor: pointer;
}

.editInfo .bottom div::before {
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    content: "";
}

.editInfo .bottom div:hover::before {
    display: none;
}

.editInfo .bottom .submit {
    float: left;
    background-color: skyblue;
}

.editInfo .bottom .cancel {
    float: right;
    background-color: #999;
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

.fill {
    width: 100%;
    height: var(--headerHeight);
}
</style>