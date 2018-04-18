<template>
		<div class="header-title">
				<h2 class="title">
						<span>{{title}}</span>
						<span class="sub-title" v-if="subTitle">
								{{subTitle}}
						</span>
						<div class="extra-oprs">
								<slot></slot>
						</div>
				</h2>
		</div>
</template>
<script>
	export default {
		name: 'header-title',
		props: {
				title: {
						type: String,
						default: ''
				},
				subTitle: {
						type: String,
						default: ''
				}
		}
	};
</script>
<style>
.header-title .title {
		margin: 0;
		padding: 1rem 0;
		font-size: 1.1rem;
		color: #3b8ede;
		font-weight: normal;
		border-bottom: 1px solid #3b8ede;
}
</style>