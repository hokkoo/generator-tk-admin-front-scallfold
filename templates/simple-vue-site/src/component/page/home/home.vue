<template>
	<div class="home clearfix" v-loading="loading">
		我们
	</div>
</template>

<script>
import extend, {mergeArray} from '../../../javascript/util/extend.js';
import some from '../../../javascript/util/lodash-es/some.js';


export default {
	name: 'home',
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