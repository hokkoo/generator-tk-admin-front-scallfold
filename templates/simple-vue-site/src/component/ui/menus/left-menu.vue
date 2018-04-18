<template>
		<div class="left-menu clearfix">
				<nav-logo :src="src" v-if="showLogo"></nav-logo>
				<el-menu theme="dark" :default-active="activeIndex" mode="vertical" @select="onClick" @open="onOpen" @close="onClose">
						<template v-for="(item, index) in menus">
								<el-submenu :index="index + ''" v-if="item.children && item.children.length">
										<template slot="title">
												<a :href="item.link || 'javascript:void(0);'">
														{{item.name}}
												</a>
										</template>
										<el-menu-item :index="index + '-' + subIndex" v-for="(subItem, subIndex) in item.children">
												<a :href="subItem.link || 'javascript:void(0);'">
														{{subItem.name}}
												</a>
										</el-menu-item>
								</el-submenu>
								<el-menu-item :index="index + ''" v-else>
										<a :href="item.link || 'javascript:void(0);'">
												{{item.name}}
										</a>
								</el-menu-item>
						</template>
				</el-menu>
		</div>
</template>
<script>
	import NavLogo from '../logo/nav-logo.vue';
	import {mergeArray} from '../../../javascript/util/extend.js';

	export default {
		name: 'left-menu',
		props: {
				showLogo: {
						type: Boolean,
						default: false
				},
				activeIndex: {
						type: Number,
						default: 0
				},
				menus: {
						type: Array,
						default: []
				},
				href: {
						type: String,
						default: '/'
				},
				src: {
						type: String,
						default: 'javasctipt:void(0);'
				}
		},
		data() {
				return {
				}
		},
		methods: {
				refresh(menus) {
						mergeArray(this.menus, menus);
				},
				onClick() {
						console.log(arguments);
				},
				onClose() {
						console.log(arguments);
				},
				onOpen() {
						console.log(arguments);
				}
		},
		components: {
				NavLogo
		}
	};
</script>
<style>

</style>