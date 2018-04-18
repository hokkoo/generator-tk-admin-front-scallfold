<template>
		<div class="circle-text">
				<div class="text-content">
						<span class="text">
								{{count | numberPad}}
						</span>
						<span class="unit">
								{{unit}}
						</span>
				</div>
				<div class="text-desc" v-if="!!desc">
						{{desc}}
				</div>
		</div>
</template>
<script>
	export default {
		name: 'circle-text',
		props: {
				count: {
						type: Number,
						default: 0
				},
				unit: {
						type: String,
						default: '件'
				},
				desc: {
						type: String,
						default: '系统'
				}
		}
	};
</script>
<style>
</style>