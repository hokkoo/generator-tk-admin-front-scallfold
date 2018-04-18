<template>

</template>
<script>
	import menu from '../../../javascript/config/menu.js';
	import siteInfo from '../../../javascript/config/site.js';
	import merge from '../../../javascript/util/lodash-es/merge.js';
	export default {
		name: 'v-footer',
		data: () => {
				return merge({}, siteInfo, {
						menus: menu.footer
				})
		}
	};
</script>
<style>

</style>