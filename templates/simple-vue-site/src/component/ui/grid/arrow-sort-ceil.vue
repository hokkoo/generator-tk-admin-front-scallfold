<template>
	<div class="arrow-sort-ceil">
		<span class="text">
			{{text}}
		</span>
		<icon :name="up ? 'arrow-up' : 'arrow-down'" @click="toggle"></icon>
	</div>
</template>

<script>
import {sort as sortEvent} from '../../../javascript/config/event.json';

export default {
	// 点击切换上下箭头的区域块
	name: 'arrow-sort-ceil',
	props: {
		text: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			up: false
		}
	},
	methods: {
		toggle() {
			this.up = !this.up;
			this.$emit(sortEvent.toggle, this.up);
		}
	}

}
</script>
