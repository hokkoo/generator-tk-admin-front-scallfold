<template>
	<div class="message-code">
		<el-form ref="form" label-width="0" :rules="rules" :model="form">
			<el-form-item prop="code">
				<el-input v-model="form.code" placeholder="短信验证码："></el-input>
			</el-form-item>
			<el-button	@click="sendMessage" :disabled="disabled">
				{{buttonText}}
			</el-button>
		</el-form>
	</div>
</template>
<script>
	var src = '/res/rpatchca.png';
	export default {
		name: 'message-code',
		props: {
			src: {
				type: String,
				default: src
			}
		},
		data() {
			return {
				form: {
					code: ''
				},
				imgSrc: src,
				rules: {
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			refresh() {
				this.imgSrc = this.src + '?' + Math.random()
			},
			validate() {
				return new Promise((resolve, reject) => {
					this.$refs['form'].validate((valid) => {
						if(valid) {
							resolve();
						} else {
							reject();
						}
					});
				});
			}
		}
	};
</script>
<style>
.verify-code img {
	width: 100px;
	height: 48px;
}

.verify-code .icon-refresh {
	display: inline-block;
	width: 20px;
	height: 20px;
	margin-left: 10px;
	background-repeat: no-repeat;
	background-position: top left;
	background-image: url(/assets/images/platform/gw/login-icons.png);
	cursor: pointer;
}
</style>