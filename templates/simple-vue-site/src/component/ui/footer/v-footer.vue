<template>
	<footer>
		<div class="footer">
				<div class="menu">
						<div class="menu-item" v-for="(item, index) in menus">
								<a href="javascript:void(0);" :href="item.link">
										{{item.name}}
										<ul class="sub-memu" v-show="item.children && item.children.length">
												<li class="menu-item" v-for="(item, index) in item.children">
														<a href="javascript:void(0);" :href="item.link">
																{{item.name}}
														</a>
												</li>
										</ul>
								</a>
						</div>
				</div>
				<div class="site-info">
						<div class="wechat">
						</div>
						<p>{{telphone}}</p>
						<p>{{email}}</p>
				</div>
		</div>
	</footer>
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

footer > .footer {
		display: table;
		table-layout: fixed;
		width: 1200px;
		margin: auto;
		padding: 10px 0 40px;
}

footer > .footer > .menu,footer > .footer > .site-info {
		display: table-cell;
		vertical-align: top;
}

footer {
		background-color: #2a3039;
		color: #fff;
		font-size: 14px;
		margin-top: 40px;
}

footer a {
		color: inherit;
		text-decoration: none;
}

.footer > .menu > .menu-item {
		float: left;
		width: 25%;
		line-height: 40px;
}

footer li {
		list-style: none;
}

footer ul {
		padding: 0;
		margin: 0;
}


.footer > .menu > .menu-item .sub-memu {
		font-size: 12px;
		color: #008cd7;
		line-height: 30px;
}

.footer > .site-info {
		width: 30%;
		text-align: right;
		font-size: 12px;
}

.footer > .site-info .wechat {
		width: 90px;
		height: 90px;
		background-repeat: no-repeat;
		background-size: 196px;
		background-image: url(/assets/images/icon/common/wechat.png);
		background-position: -26px 4px;
		display: inline-block;
}


</style>