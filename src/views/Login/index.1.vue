<template>
	<div id="login">
		<div class="login-wrap">
			<ul class="menu-tab">
				<li v-for="item in menuTab" :key="item.id" :class="{ current: item.current }" @click="toggleMeun(item)">{{ item.txt }}</li>
			</ul>
			<!-- Login——form -->
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium">
				<el-form-item prop="username">
					<label>邮箱</label>
					<el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<label>密码</label>
					<el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item prop="passwords" v-if="model === 'register'">
					<label>重复密码</label>
					<el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<label>验证码</label>
					<el-row :gutter="10">
						<el-col :span="16"><el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
						<el-col :span="8"><el-button type="success" class="btn">获取验证码</el-button></el-col>
					</el-row>
				</el-form-item>
				<el-form-item><el-button type="danger" @click="submitForm('ruleForm')" class="nth-btn" label-width>提交</el-button></el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
export default {
	name: 'login',
	data() {
		var validateUserName = (rule, value, callback) => {
			let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
			if (value === '') {
				callback(new Error('请输入用户名'));
			} else if (!reg.test(value)) {
				callback(new Error('邮箱格式有误'));
			} else {
				callback();
			}
		};
		var validatePassWord = (rule, value, callback) => {
			let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (!reg.test(value)) {
				callback(new Error('6-20位字母和数字'));
			} else {
				callback();
			}
		};
		var validatePassWords = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入重复密码'));
			} else if (value != this.ruleForm.password) {
				callback(new Error('重复密码有误'));
			} else {
				callback();
			}
		};
		var checkCode = (rule, value, callback) => {
			let reg = /^[a-z0-9]{6}$/;
			if (value === '') {
				return callback(new Error('请输入验证码'));
			} else if (!reg.test(value)) {
				callback(new Error('验证码有误'));
			} else {
				callback();
			}
		};
		return {
			menuTab: [{ txt: '登陆', current: true, type: 'login' }, { txt: '注册', current: false, type: 'register' }],
			model: 'login',
			ruleForm: {
				username: '',
				password: '',
				passwords: '',
				code: ''
			},
			rules: {
				username: [{ validator: validateUserName, trigger: 'blur' }],
				password: [{ validator: validatePassWord, trigger: 'blur' }],
				passwords: [{ validator: validatePassWords, trigger: 'blur' }],
				code: [{ validator: checkCode, trigger: 'blur' }]
			}
		};
	},
	methods: {
		toggleMeun(data) {
			this.menuTab.forEach(element => {
				element.current = false;
			});
			// 切换按钮时高亮
			data.current = true;

			this.model = data.type;
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
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
