<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name: 'App',
		mounted() {
			window.app = this;
		}
	}
</script>
<style type="text/css">
#app .sidebar-container {
    transition: width .28s;
    width: 180px!important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
}

#app .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
}


.scroll-container .scroll-wrapper{
    position: absolute;
    width: 100%!important;
}

.el-menu-item {
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    cursor: pointer;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    padding-left: 20px;
    color: rgb(191, 203, 217);
    background-color: rgb(48, 65, 86);
}

.el-submenu__title {
	padding-left: 20px;
    color: rgb(191, 203, 217);
    background-color: rgb(48, 65, 86);
}

.el-menu-item.is-active {
    color: #409eff;
}

.el-submenu .el-menu {
    background-color: #1f2d3d;
}

.el-submenu .el-menu-item {
    background-color: inherit;
}

.el-submenu .el-menu-item:hover {
	background-color: #001528;
}
.el-submenu__title:hover,
.el-menu-item:hover {
    background-color: rgb(38,52,69);
}

a {
	text-decoration: none;
}
</style>