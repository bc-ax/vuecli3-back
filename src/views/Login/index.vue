<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li
                    v-for="item in menuTab"
                    :key="item.id"
                    :class="{'current':item.current}"
                    @click="toggleMeun(item)"
                >{{item.txt}}</li>
            </ul>
            <!-- Login——form -->
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
                size="medium"
            >
                <el-form-item prop="username">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="age">
                    <label>验证码</label>
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="danger"
                        @click="submitForm('ruleForm')"
                        class="nth-btn"
                        label-width
                    >提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        var checkAge = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入验证码"));
            }else{
                callback();
            }
        };
        return {
            menuTab: [
                { txt: "登陆", current: true },
                { txt: "注册", current: false }
            ],
            ruleForm: {
                username: "",
                checkPass: "",
                age: ""
            },
            rules: {
                username: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                age: [{ validator: checkAge, trigger: "blur" }]
            }
        };
    },
    methods: {
        toggleMeun(data) {
            this.menuTab.forEach(element => {
                element.current = false;
            });
            data.current = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
#login {
    width: 100%;
    height: 100vh;
    padding-top: 200px;
    background-color: #344a5f;
    color: #fff;
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.menu-tab {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        border-radius: 3px;
        cursor: pointer;
    }
    .current {
        background-color: rgba(0, 0, 0, 0.1);
    }
}
.demo-ruleForm {
    margin-top: 30px;
    color: #fff;
    .el-form-item {
        margin-bottom: 20px;
    }
    .nth-btn {
        display: inline-block;
        width: 100%;
        margin-top: 15px;
    }
}
</style>