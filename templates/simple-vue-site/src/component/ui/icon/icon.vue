<template>
	<i class="icon" :class="iconClass" :type="type" @click="handleClick"></i>
</template>

<script>
import {base as baseEvent} from '@/javascript/config/event.json';
export default {
	name: 'icon',
	props: {
		name: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'md'
		},
		type: {
			type: String,
			default: ''
		},

	},
	methods: {
		handleClick(ev) {
			this.$emit(baseEvent.click, ev)
		}
	},
	computed: {
		iconClass() {
			return {
				[`${this.type} ${this.type}-${this.name} icon-${this.name} icon-${this.size} icon-${this.name}-${this.size}`]: true
			}
		}
	}

}
</script>
