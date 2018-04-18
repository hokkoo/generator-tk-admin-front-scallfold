<template>
	<header>
		<div class="header">
				<div class="logo">
						<a href="/page/platform/home.html">
							 
						</a>
				</div>
				<div class="menu">
						<el-menu :default-active="menuIndex" class="el-menu" mode="horizontal">
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
				<div class="user-area">
						<div class="login-area" v-show="!user.isLogined">
								<a class="btn" href="/pages/login.html">登录</a>
								<a class="btn" href="/pages/register.html">注册</a>
								<a class="btn" href="/pages/login.html">返回旧版</a>
						</div>
						<div class="logined-area" v-show="user.isLogined">
								<el-menu :default-active="userMenuIndex" class="el-menu" mode="horizontal">
										<template v-for="(item, index) in userMenus">
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
								<div class="user-info">
										<el-menu :default-active="loginMenuIndex" class="el-menu" mode="horizontal">
												<el-submenu>
														<template slot="title">
																<span class="messsage-badge"></span>
																<span class="user-name">{{user.atten}}</span>
														</template>
														<el-menu-item>
																<span>退出</span>
																<span class="logout" @click="logout">
																		<i class="icons-out"></i>
																</span>
														</el-menu-item>
												</el-submenu>
										</el-menu>
								</div>
						</div>
				</div>
		</div>
	</header>
</template>
<script>
	import menu from '../../../javascript/config/menu.js';
	import info from '../../../javascript/config/info.js';
	export default {
		name: 'v-header',
		data(){
				return {
						menuIndex: '1',
						userMenuIndex: '1',
						loginMenuIndex: '1',
						menus: menu.nav,
						userMenus: menu.userArea,
						user: info.user
				}
		},
		methods: {
				logout() {

				}
		},
		mounted() {
				console.log(this.user)
		}
	};
</script>
<style>

header {
		background-color: #2a3039;
}

header .el-menu {
		background-color: #2a3039;
		color: #fff;
}

header .el-menu-item,header .el-submenu__title {
		color: #fff;
}

header .el-menu a {
		color: inherit;
}

header a {
		text-decoration: none;
}

header .el-menu--horizontal .el-menu-item:hover,header .el-menu--horizontal .el-submenu__title:hover {
		background-color: inherit;
}

header .el-menu--horizontal .el-submenu>.el-menu {
		background-color: #2a3039;
}

header .el-menu--horizontal .el-submenu .el-menu-item {
		background-color: #2a3039;
}


header > .header {
		width: 1200px;
		margin: auto;
		display: table;
		table-layout: fixed;
}

.header> .logo, .header>.menu,.header > .user-area {
		display: table-cell;
		vertical-align: middle;
}

.header> .logo {
		width: 200px;
		background-image: url('../../../images/icon/common/logo.png');
		background-repeat: no-repeat;
		background-position: center center;
}

.header .logined-area {
		display: table;
}

.header .logined-area >ul,.header .logined-area >	.user-info {
		display: table-cell;
		vertical-align: middle;
}

.header> .logo a {
		width: 100%;
		height: 60px;
		display: block;
}

header .el-menu--horizontal .el-submenu .el-menu-item:hover {
		background-color: #222;
		color: #fff;
}

.user-area .login-area .btn {
		border: 1px solid #fff;
		border-radius: 0;
		background-color: #2a3039;
		padding: 8px 14px;
		color: #fff;
		font-size: 12px;
		margin-left: 10px;
}

.user-area .login-area {
		text-align: right;
}

.user-area .login-area .btn:hover {
		color: #008cd6;
		border-color: #008cd6;
}
</style>