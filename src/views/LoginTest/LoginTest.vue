<template>
    <div class="all">
        <!-- 背景 -->
        <div class="background">
            <img :src="imgSrc" width="100%" height="100%" alt />
        </div>

        <!-- 表单 -->
        <div class="login">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 登陆 -->
                <el-tab-pane label="登录" name="first">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="账号" prop="name">
                            <el-input v-model="ruleForm.name" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="pass">
                            <el-input
                                type="password"
                                v-model="ruleForm.pass"
                                auto-complete="off"
                                show-password
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <!-- 注册 -->
                <el-tab-pane label="注册" name="second">
                    <register></register>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import register from "views/loginTest/Register.vue";
import ElementUI from "plugins/ElementUI.js";
import { login, changePwd } from "network/Login.js";

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }

                callback();
            }
        };

        return {
            imgSrc: require("assets/img/one.png"),
            activeName: "first",
            ruleForm: {
                name: "",
                pass: "",
                checkPass: "",
            },
            rules: {
                // 验证用户名
                name: [
                    { required: true, message: "请输入您的名称", trigger: "blur" },
                    { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
                ],
                // 验证密码
                pass: [{ required: true, validator: validatePass, trigger: "blur" }],
            },
        };
    },

    methods: {
        // 选项卡切换
        handleClick(tab, event) { },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 提交表单
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const res = await login(this.ruleForm);
                    console.log(res);

                    if (res.data.flag == true) {
                        this.$message.success("登录成功");
                    } else {
                        this.$message.error("登录失败");
                    }

                    // 将token存到cookie中
                    // $.cookie("token", res.data.token);
                    // $.cookie("account", res.data.username);

                    // 跳转到主页
                    this.$router.push("/home");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },

    components: {
        register,
        ...ElementUI,
    },
};
</script>

<style scoped>
.all {
}

.background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.login {
    position: absolute;
    width: 400px;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 60px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
}

.el-tabsitem {
    text-align: center;
    width: 60px;
}
</style>