<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li
                    v-for="item in menuTab"
                    :key="item.id"
                    :class="{ current: item.current }"
                    @click="toggleMenu(item)"
                >{{ item.txt }}</li>
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
                <el-form-item prop="password">
                    <label>密码</label>
                    <el-input
                        type="password"
                        v-model="ruleForm.password"
                        autocomplete="off"
                        minlength="6"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="passwords" v-if="model === 'register'">
                    <label>重复密码</label>
                    <el-input
                        type="password"
                        v-model="ruleForm.passwords"
                        autocomplete="off"
                        minlength="6"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button
                                type="success"
                                class="btn"
                                @click="getSms()"
                                :disabled="codeButtonStatus.status"
                            >{{codeButtonStatus.text}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="danger"
                        @click="submitForm('ruleForm')"
                        class="nth-btn"
                        :disabled="loginButtonStatus"
                        label-width
                    >{{model === 'login' ? '登陆':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import sha1 from 'js-sha1';
import { GetSms, Register ,Login} from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
    name: "login",
    setup(props, context) {
        // 正则验证----------------------------------------------
        let validateUserName = (rule, value, callback) => {
            let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if (value === "") {
                callback(new Error("请输入邮箱"));
            } else if (!reg.test(value)) {
                callback(new Error("邮箱格式有误"));
            } else {
                callback();
            }
        };
        let validatePassWord = (rule, value, callback) => {
            let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!reg.test(value)) {
                callback(new Error("6-20位字母和数字"));
            } else {
                callback();
            }
        };
        let validatePassWords = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入重复密码"));
            } else if (value != ruleForm.password) {
                callback(new Error("重复密码有误"));
            } else {
                callback();
            }
        };
        let checkCode = (rule, value, callback) => {
            let reg = /^[a-z0-9]{6}$/;
            if (value === "") {
                return callback(new Error("请输入验证码"));
            } else if (!reg.test(value)) {
                callback(new Error("验证码有误"));
            } else {
                callback();
            }
        };
 
        // ---------------------声明对象--------------------------------------------------
        // 声明对象时用reactive
        const menuTab = reactive([
            { txt: "登陆", current: true, type: "login" },
            { txt: "注册", current: false, type: "register" }
        ]);
        const ruleForm = reactive({
            username: "",
            password: "",
            passwords: "",
            code: ""
        });
        const rules = reactive({
            username: [{ validator: validateUserName, trigger: "blur" }],
            password: [{ validator: validatePassWord, trigger: "blur" }],
            passwords: [{ validator: validatePassWords, trigger: "blur" }],
            code: [{ validator: checkCode, trigger: "blur" }]
        });
        // 验证码
        const codeButtonStatus = reactive({
            status: false,
            text: "获取验证码"
        });
        // console.log(menuTab);
        // 声明基本数据类型用ref 获取时需要用.value
        const model = ref("login");
        // console.log(model.value);

        // 登陆禁用按钮
        const loginButtonStatus = ref(true);

        // 倒计时
        const times = ref(null);

        // 判断是否是基础数据类型
        // console.log(isRef(model) ? true : false);

        /*
         *methods vue3.0废除
         */
        /**
         * 登陆 注册切换按钮
         * */
        const toggleMenu = data => {
            menuTab.forEach(element => {
                element.current = false;
            });
            // 切换按钮时高亮
            data.current = true;
            model.value = data.type;
            // 重置表单
            context.refs["ruleForm"].resetFields();
            // codeButtonStatus.status = false;
            // codeButtonStatus.text = '获取验证码';
            clearCountDwon();
        };

        // 更改验证码按钮状态
        const updateCodeButton = ((data)=>{
            codeButtonStatus.status = data.status;
            codeButtonStatus.text = data.text;
        })

        /**
         * 获取验证码
         * */
        const getSms = () => {
            let data = {
                username: ruleForm.username,
                module: model.value
            };
            // console.log(data)
            // console.log(data)
            let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if (ruleForm.username === "") {
                context.root.$message({
                    message: "邮箱为空",
                    type: "warning"
                });
                return false;
            }else if(!reg.test(ruleForm.username)){
                context.root.$message({
                    message: "邮箱命名有误",
                    type: "warning"
                });
                return false;
            }
            // GetSms({ username: ruleForm.username, module: "login" })
            // 验证码按钮点击时禁用 文本改变
            updateCodeButton({
                status : true,
                text : "发送中"
            })
            // 验证码请求时间
            // setTimeout(() => {
                GetSms(data).then(response => {
                        let data = response.data;
                        // console.log(data)
                        //验证码获取
                        // context.root.$message({
                        //     message:data.message,
                        //     type:'success'
                        // });

                        // 启用登录按钮
                        loginButtonStatus.value = false;
                        // 倒计时
                        countDwon(30);
                }).catch(error => {
                    console.log(error);
                });
            // }, 3000);
        };

        // 创建倒计时60秒
        const countDwon = number => {
            let time = number;
            // 查找是还有存在的定时器 
            if(times.value){
                clearInterval(times.value)
            }
            times.value = setInterval(() => {
                time--;
                if (time === 0) {
                    // 清除计时器
                    clearInterval(times.value);
                    updateCodeButton({
                        status : false,
                        text : "重新发送"
                    })
                    // codeButtonStatus.status = false;
                    // codeButtonStatus.text = "重新发送";
                } else {
                    codeButtonStatus.text = `倒计时${time}秒`;
                }
            }, 1000);
        };


        // 清除倒计时
        const clearCountDwon = (()=>{
            updateCodeButton({
                status : false,
                text : "获取验证码"
            })
            clearInterval(times.value);
        })

        // 登陆
        const login = (()=>{
            let LoginData = {
                username:ruleForm.username,
                password:sha1(ruleForm.password),
                code:ruleForm.code
            }
            context.root.$store.dispatch('app/login',LoginData).then((response)=>{
                console.log(response.data)
                // 路由跳转至控制台
                context.root.$router.push({
                    name:'Console'
                });
            }).catch((error)=>{
                console.log(error)
            })
            // Login(LoginData).then((response)=>{
            //     console.log(response.data)
            //     // 路由跳转至控制台
            //     context.root.$router.push({
            //         name:'Console'
            //     });
            // }).catch((error)=>{
            //     console.log(error)
            // })
        })

        // 注册
        const register = (()=>{
            let RegisterData = {
                username: ruleForm.username,
                password: sha1(ruleForm.password),
                code: ruleForm.code,
                module: 'register'
            };

            Register(RegisterData).then((response)=>{
                let data = response.data;
                toggleMenu(menuTab[0]);
                clearCountDwon();
            }).catch(error=>{
                console.log(error)
            })
        })

        /**
         * 提交表单
         * */
        const submitForm = formName => {
            context.refs[formName].validate(valid => {
                if (valid) {
                    model.value === 'register' ? register() : login();                   
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        };

        /*
         *生命周期
         * 挂载完成后
         */
        onMounted(() => {});

        return {
            menuTab,
            model,
            ruleForm,
            rules,
            codeButtonStatus,
            loginButtonStatus,
            toggleMenu,
            submitForm,
            getSms,
            Register,
            clearCountDwon
        };
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
    .btn {
        display: inline-block;
        width: 100%;
    }
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
