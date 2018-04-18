<template>
	<div class="about clearfix" v-loading="loading">
		关于我们
	</div>
</template>

<script>
import extend, {mergeArray} from '../../../javascript/util/extend.js';
import some from '../../../javascript/util/lodash-es/some.js';


export default {
	name: 'about',
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