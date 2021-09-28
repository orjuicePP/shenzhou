<template>
    <div class="admin">
        <Header></Header>
        <div class="core">
            <div class="tabBar">
                <ul>
                    <li class="now">导游申请</li>
                    <li>礼品兑换申请</li>
                </ul>
            </div>
            <div class="content"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/content/Header.vue';
export default {
    name: 'Administrator',
    data() {
        return {};
    },
    components: {
        Header,
    }
};
</script>

<style scoped>
.admin {
    width: 100%;
    height: 100%;
    background-color: #e3e3e3;
}

.core {
    width: var(--baseWidth);
    margin: 50px auto 0px;
}

.core .tabBar {
    --tabHeight: 50px;
    height: var(--tabHeight);
}

.core ul {
    height: 100%;
}

.core ul li {
    float: left;
    height: 100%;
    padding: 0px 20px;
    line-height: var(--tabHeight);
    border-radius: 20px 20px 0px 0px;
    background-color: #f3f3f3;
    cursor: pointer;
}

.core ul li:hover {
    background-color: #fafafa;
}

.core ul .now {
    background-color: #fff;
}

.core ul .now:hover {
    background-color: #fff;
}

.core .content {
    height: 500px;
    background-color: #fff;
}
</style>