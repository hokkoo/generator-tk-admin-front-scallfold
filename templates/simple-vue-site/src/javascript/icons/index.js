// import Vue from 'vue'
import SvgIcon from '@elementAdmin/components/SvgIcon/index.vue'// svg组件
import generateIconsView from '@elementAdmin/views/svg-icons/generateIconsView.js'// just for @elementAdmin/views/icons , you can delete it

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)

generateIconsView.generate(iconMap) // just for @elementAdmin/views/icons , you can delete it
