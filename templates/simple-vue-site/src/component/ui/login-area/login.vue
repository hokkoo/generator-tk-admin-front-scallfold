<template>
		<div class="login">
				<h3 class="title">
						登录
				</h3>
				<div class="detail">
						<el-form ref="form" :model="login" label-width="0" :rules="rules">
								<el-form-item prop="name">
										<el-input type="text" placeholder="用户名/邮箱/手机" v-model="login.name" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item prop="pwd">
										<el-input type="password" placeholder="输入密码：（6-32位密码）" v-model="login.pwd" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item >
										<verify-code ref="verifyCode"></verify-code>
								</el-form-item>
								<el-form-item >
										<div class="opr">
												<el-button type="primary" @click="submit">登录</el-button>
										</div>
								</el-form-item>
						</el-form>
				</div>
		</div>
</template>
<script>
	import VerifyCode from '../verify-code/verify-code.vue';
	export default {
		data(){
				return {
						login: {
							name: '',
							pwd: '',
							isDafa: false
						},
						rules: {
							name: [
								{ required: true, message: '请输入用户名/邮箱/手机', trigger: 'blur' },
								{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
							],
							pwd: [
								{ required: true, message: '请输入密码', trigger: 'blur' }
							]
						}
				}
		},
		methods: {
				submit() {
					this.$refs['form'].validate((valid) => {
						console.log(valid);
						if(valid) {
							this.$refs.verifyCode.validate().then(() => {
								console.log(this)
							}, () => {
								console.log(this)
							})
						}
					});
				}
		},
		components: {
				VerifyCode
		}
	};
</script>
<style>
.login .label {
		margin-right: 10px;
}

.login .opr .el-button {
		width: 100%;
}

</style>