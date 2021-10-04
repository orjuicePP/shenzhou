<template>
    <div class="DialogRoot">
        <div class="dialogBox" :style="style">
            <slot></slot>
        </div>
        <div class="transparent"></div>
    </div>
</template>

<script>
export default {
    name: 'Dialog',
    data() {
        return {
            status: false,
            callback: null,
            style: {},
        };
    },
    props: ['config'],
    methods: {
    },
    created() {
        if (this.config != null) {
            this.style = this.config.style;
        }
    }
}
</script>

<style scoped>
.dialogBox {
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