<template>
	<section class="app-main" :style="[hiddenSidebarStyle]">
		<div class="container is-fluid is-marginless app-content">
			<levelbar></levelbar>
			<transition
				mode="out-in"
				enter-active-class="fadeIn"
				leave-active-class="fadeOut"
				appear>
				<router-view class="animated"></router-view>
			</transition>
		</div>
	</section>
</template>

<script>
import Levelbar from './Levelbar.vue'
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			sidebar: 'sidebar'
		}),
		hiddenSidebarStyle () {
			return this.sidebar.hidden ? { 'margin-left': 0 } : null
		}
	},

	components: {
		Levelbar
	}
}
</script>

<style>
</style>
