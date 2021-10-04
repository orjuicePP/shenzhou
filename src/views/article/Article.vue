<template>
    <div class="ArticleRoot">
        <Header ref="header"></Header>
        <div class="main">
            <div class="left">
                <div v-if="!photoStatus" class="core" @click="changePhotoStatus">
                    <div class="title">{{article.title}}</div>
                    <div class="content">{{article.content}}</div>
                    <div class="time">{{article.time}}</div>
                </div>
                <div class="photo" :style="getArticleBG" @click="changePhotoStatus"></div>
                <div v-if="!photoStatus" class="reward" @click="rewardData.status = true">
                    <div class="btn iconfont icon-dashang"></div>
                    <div class="text">打赏</div>
                </div>
                <div
                    v-if="!photoStatus"
                    class="thumb"
                    @click="thumbClick"
                    :style="{color: getThumbColor}"
                >
                    <div class="btn iconfont icon-dianzan"></div>
                    <div class="num">{{article.thumb}}</div>
                </div>
            </div>
            <div class="right">
                <div class="authorInfo">
                    <div class="top">
                        <div class="headPhoto" :style="getAuthorHP"></div>
                        <div class="middle">
                            <div class="username">{{author.username}}</div>
                            <div class="account">账号：{{article.authorAccount}}</div>
                        </div>
                        <div class="level">Lv{{author.level}}</div>
                    </div>
                    <div class="other" :title="author.other">{{author.other}}</div>
                </div>
                <div class="name">景点名：{{article.placeName}}</div>
                <div class="province">所在地：{{article.province}}</div>
                <div class="otherArticle">
                    <p>猜你喜欢</p>
                    <ul>
                        <li
                            v-for="item in like"
                            :style="{backgroundColor: item.bgc}"
                            @click="toOtherArticle(item)"
                        >
                            <div class="title">{{item.title}}</div>
                            <div class="placeName">{{item.placeName}}</div>
                            <div class="province">{{item.province}}</div>
                            <div class="authorName">{{item.authorUsername}}</div>
                            <div class="time">{{item.time}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rewardBox" v-if="rewardData.status">
            <div class="close iconfont icon-icon_close" @click="rewardData.status = false"></div>
            <div class="content">
                <div class="title">金额</div>
                <div class="price" @click="changeRewardPrice">{{rewardTable[rewardData.priceIndex]}}</div>
                <div class="submit" @click="rewardSubmit">打赏</div>
            </div>
        </div>
        <div class="transparent" v-if="rewardData.status"></div>
    </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import { getArticleInfo, getRandomArticle, thumbArticle, rewardArticle } from 'network/Article.js';
import { getUserInfo, getRewardTable, getPhotoUrl } from 'network/Public.js';
import eui from 'plugins/ElementUI.js';

export default {
    data() {
        return {
            articleId: '',
            article: {},
            author: {},
            like: [],
            photoStatus: false,
            thumbed: false,
            rewardTable: [],
            rewardData: {
                status: false,
                priceIndex: 0
            },
        };
    },
    components: {
        Header,
    },
    methods: {
        async loadArticle() {
            this.article = (await getArticleInfo({
                token: util.getCookie('token'),
                id: this.$route.query.articleId
            })).data.data;

            this.loadAuthor(this.article.authorAccount);

            this.thumbed = this.article.isThumb;
            this.article.time = util.getDateString(this.article.releaseTime);
        },
        async loadAuthor(account) {
            this.author = (await getUserInfo({
                account
            })).data.data;
        },
        async loadLike() {
            let arr = (await getRandomArticle({
                token: util.getCookie('token'),
            })).data.data.articles;
            for (let art of arr) {
                if (art.id != this.articleId) {
                    art.time = util.getDateString(art.releaseTime);
                    art.bgc = util.randomColor(230, 250);
                    this.like.push(art);
                }
            }
        },
        async loadRewordTable() {
            let res = (await getRewardTable({
                token: util.getCookie('token'),
            })).data.data;
            this.rewardTable = res.priceList;
        },
        changePhotoStatus() {
            if (this.article.photoUrl != null) {
                this.photoStatus = !this.photoStatus;
            }
        },
        thumbClick() {
            if (!this.article.isThumb) {
                this.toThumb();
                this.article.isThumb = true;
            }
            if (this.thumbed) {
                this.article.thumb--;
            } else {
                this.article.thumb++;
            }
            this.thumbed = !this.thumbed;
        },
        async toThumb() {
            let res = (await thumbArticle({
                token: util.getCookie('token'),
                id: this.articleId,
                type: 1,
            })).data;
            if (!res.flag) {
                eui.Message.error(res.message);
            }
        },
        toOtherArticle(item) {
            this.$router.push({
                path: '/article',
                query: {
                    articleId: item.id
                }
            });
            location.reload();
        },
        changeRewardPrice() {
            this.rewardData.priceIndex = (this.rewardData.priceIndex + 1) % this.rewardTable.length;
        },
        async rewardSubmit() {
            let money = this.rewardTable[this.rewardData.priceIndex];
            let price = this.$refs.header.getUserInfo().balance;
            if (money > price) {
                eui.Message.error('你钱不够');
            } else {
                let res = (await rewardArticle({
                    token: util.getCookie('token'),
                    id: this.articleId,
                    money
                })).data;
                if (res.flag) {
                    location.reload();
                } else {
                    eui.Message.error(res.message);
                }
            }
        }
    },
    computed: {
        getArticleBG() {
            if (this.article.photoUrl != null) {
                return { backgroundImage: getPhotoUrl(this.article.photoUrl) };
            } else {
                return { backgroundColor: '#fff' };
            }
        },
        getAuthorHP() {
            return { backgroundImage: getPhotoUrl(this.author.headPortraitUrl) };
        },
        getThumbColor() {
            return this.thumbed ? '#ff5c38' : '#666';
        }
    },
    created() {
        this.articleId = this.$route.query.articleId;
        this.loadArticle();
        this.loadLike();
        this.loadRewordTable();
    }
};

</script>

<style>
.main {
    width: var(--baseWidth);
    height: 640px;
    margin: 24px auto;
}

.main > div {
    height: 100%;
}

.main > .left {
    position: relative;
    float: left;
    width: 900px;
    cursor: pointer;
}

.main > .left > .core {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
}

.main > .left > .core > .title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
}

.main > .left > .core > .content {
    height: 480px;
    font-size: 18px;
    overflow-y: scroll;
}

.main > .left > .core > .content::-webkit-scrollbar {
    display: none;
}

.main > .left > .core > .time {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 14px;
}

.main > .left > .photo {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
}

.main > .left > .reward {
    position: absolute;
    bottom: 20px;
    right: 108px;
    z-index: 2;
}

.main > .left > .reward > div {
    float: left;
    height: 30px;
    line-height: 30px;
}

.main > .left > .reward > .btn {
    height: 30px;
    font-size: 20px;
    color: #666;
}

.main > .left > .reward > .text {
    margin-left: 5px;
    font-size: 16px;
    color: #666;
}

.main > .left > .thumb {
    position: absolute;
    bottom: 20px;
    right: 28px;
    z-index: 2;
}

.main > .left > .thumb > div {
    float: left;
    height: 30px;
    line-height: 30px;
}

.main > .left > .thumb > .btn {
    height: 30px;
    font-size: 26px;
}

.main > .left > .thumb > .num {
    margin-left: 5px;
    font-size: 16px;
}

.main > .right {
    display: flex;
    flex-flow: column nowrap;
    float: right;
    width: 320px;
}

.main > .right > div {
    padding: 15px;
    box-sizing: border-box;
}

.main > .right > .authorInfo {
    height: 100px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
}

.main > .right > .authorInfo > .top {
    display: flex;
    flex-flow: wrap nowrap;
    justify-content: space-between;
    height: 40px;
}

.main > .right > .authorInfo > .top > .headPhoto {
    width: 40px;
    margin-right: 10px;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.main > .right > .authorInfo > .top > .middle {
    flex: 1;
    overflow: hidden;
}

.main > .right > .authorInfo > .top > .middle > div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.main > .right > .authorInfo > .top > .middle > .username {
    font-size: 18px;
}

.main > .right > .authorInfo > .top > .middle > .account {
    font-size: 12px;
}

.main > .right > .authorInfo > .top > .level {
    width: 30px;
    line-height: 40px;
    margin-left: 10px;
    color: #ff5c38;
    cursor: default;
}

.main > .right > .authorInfo > .other {
    margin-top: 10px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #333;
    cursor: pointer;
}

.main > .right > .name {
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 24px;
    background-color: #fff;
}

.main > .right > .province {
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 24px;
    background-color: #fff;
}

.main > .right > .otherArticle {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
}

.main > .right > .otherArticle > p {
    height: 30px;
    font-size: 20px;
    margin-bottom: 10px;
}

.main > .right > .otherArticle > ul {
    flex: 1;
    overflow: hidden;
}

.main > .right > .otherArticle > ul > li {
    position: relative;
    height: 54px;
    margin-bottom: 12px;
    border-radius: 5px;
    box-sizing: border-box;
    color: #333;
    cursor: pointer;
}

.main > .right > .otherArticle > ul > li::before {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    content: "";
}

.main > .right > .otherArticle > ul > li:hover::before {
    display: none;
}

.main > .right > .otherArticle > ul > li > .title {
    position: absolute;
    top: 5px;
    left: 8px;
}

.main > .right > .otherArticle > ul > li > .authorName {
    position: absolute;
    top: 5px;
    right: 8px;
}

.main > .right > .otherArticle > ul > li > .time {
    position: absolute;
    bottom: 5px;
    right: 8px;
    font-size: 12px;
    color: #666;
}

.main > .right > .otherArticle > ul > li > .placeName {
    position: absolute;
    bottom: 5px;
    left: 8px;
    width: 60px;
    font-size: 12px;
}

.main > .right > .otherArticle > ul > li > .province {
    position: absolute;
    bottom: 5px;
    left: 80px;
    font-size: 12px;
}

.rewardBox {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: 240px;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px #fff;
    background-color: #fff;
    transform: translate(-50%, -50%);
}

.rewardBox .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    color: #666;
    cursor: pointer;
}

.rewardBox .close:hover {
    color: #000;
}

.rewardBox .content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: calc(100% - 50px);
    padding: 0px 10px;
    margin-top: 25px;
    cursor: default;
}

.rewardBox .content div {
    line-height: 30px;
}

.rewardBox .content .title {
    font-size: 20px;
}

.rewardBox .content .price {
    width: 80px;
    padding: 0px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    background-color: #ccc;
    text-align: center;
    cursor: pointer;
}

.rewardBox .content .submit {
    padding: 0px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    background-color: #ff5c38;
    cursor: pointer;
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
