import App from '../../../component/page/app/app.vue';
import router from '../../../javascript/routes/index.js';
import store from '../../../javascript/stores/index.js';
/*
	TODO cookie统一设置
*/
import Cookies from 'js-cookie'
Cookies.set('language', 'zh');

import i18n from '../../lang' // Internationalization
import '../../icons/' // icon
import '../../util/errorLog.js'// error log
import appPermission from '../../permission/app.js' // permission control
// import './mock' // simulation data

// import * as filters from './filters' // global filters

appPermission(router, store);


Vue.use(ELEMENT, {
	size: 'medium', // set element-ui default size
	i18n: (key, value) => i18n.t(key, value),
	locale: 'zh'
})

// register global utility filters.
/*Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})*/

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	i18n,
	template: '<App/>',
	components: { App }
})
