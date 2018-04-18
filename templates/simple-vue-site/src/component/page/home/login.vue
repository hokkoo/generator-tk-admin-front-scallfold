<template>
	<div class="login clearfix" v-loading="loading">
		登录
	</div>
</template>

<script>
import extend, {mergeArray} from '../../../javascript/util/extend.js';
import some from '../../../javascript/util/lodash-es/some.js';


export default {
	name: 'login',
	props: {
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {

	},
	computed: {

	}
}
</script>
<style type="text/css">

</style>