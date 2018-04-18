<template>
	<div class="simple-verify-code">
		<img :src="imgSrc" alt="验证码" @click="refresh">
		<icon name="refresh" @click="refresh"></icon>
	</div>
</template>
<script>
	var src = '/res/rpatchca.png';
	export default {
		name: 'simple-verify-code',
		props: {
			src: {
				type: String,
				default: src
			}
		},
		data() {
			return {
				imgSrc: src
			}
		},
		methods: {
			refresh() {
				this.imgSrc = this.src + '?' + Math.random()
			}
		}
	};
</script>
<style>

.simple-verify-code {
		display: inline-block;
}
.simple-verify-code img {
		width: 4rem;
		height: 1.2rem;
}

.simple-verify-code .icon-refresh-md {
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		margin-left: 0.2rem;
		background-repeat: no-repeat;
		background-position: top left;
		background-image: url(/assets/images/icons/refresh.png);
		cursor: pointer;
		margin-top: 0;
}
</style>