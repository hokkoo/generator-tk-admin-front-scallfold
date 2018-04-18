<template>
		<div class="main-content" :style="style" :class="mainClass">
				<div class="main-column column-left" v-if="cols >1">
						<slot name="column-left"></slot>
				</div>
				<div class="main-column column-center">
						<slot name="column-center"></slot>
				</div>
				<div class="main-column column-right" v-if="cols = 3">
						<slot name="column-right"></slot>
				</div>
		</div>
</template>
<script>
		export default {
				name: 'main-content',
				props: {
						width: String,
						cols: {
								type: Number,
								default: 1
						}
				},
				data() {
						return {
								style: {
										width: '100%'
								},
								mainClass: {
								}
						}
				},
				beforeMount() {
						if(this.width) {
								this.style.width = this.width;
						}
						this.mainClass['column-' + this.cols] = true;
				}
		}
</script>
<style>
body {
		margin: 0;
		padding: 0;
}
</style>