<template>
	<ul class="pager">
		<li class="item prev" :disabled="disabledPrev" @click="goPrev">
			{{prevText}}
		</li>
		<li class="item" v-for="idx in pages" :active="current===idx">
			<span class="text" @click="toggle(idx)" >
				{{idx}}
			</span>
		</li>
		<li class="item prev" :disabled="disabledNext" @click="goNext">
			{{nextText}}
		</li>
	</ul>
</template>

<script>
import {pager as pagerEvent} from '../../../javascript/config/event.json';
export default {
	name: 'pager',
	props: {
		current: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 10
		},
		prevText: {
			type: String,
			default: '上一页'
		},
		nextText: {
			type: String,
			default: '下一页'
		}

	},
	methods: {
		toggle(idx) {
			this.$emit(pagerEvent.goto, idx);
		},
		goPrev() {
			if(!this.disabledPrev) {
				this.$emit(pagerEvent.prev);
			}
		},
		goNext() {
			if(!this.disabledNext) {
				this.$emit(pagerEvent.next);
			}
		}
	},
	computed: {
		disabledPrev() {
			return this.current <= 1;
		},
		disabledNext() {
			const total = this.pages.length;
			return this.current >= total;
		},
		pages() {
			const format = this.format, total = this.total, max = this.max, current = this.current;
			let start = 1, end = total;
			let mid = Math.floor(max / 2);
			if(total > max && current > mid) {
				start = current - mid;
				end = max - start;
			}
			let arr = [];
			for(let i = start; i <= end; i++) {
				arr.push(i);
			}
			return arr;
		}
	}

}
</script>
<style>
.pager {
		line-height: 1rem;
		color: #333;
		font-size: 0.6rem;
		position: relative;
		user-select: none;
}

.pager > .item {
		display: inline-block;
		width: 1rem;
		cursor: pointer;
}



.pager > .prev, .pager > .next {
		width: 3rem;
}



.pager > .item[disabled] {
		cursor: not-allowed;
		color: #999;
}

.pager > .item[active] {
		color: #3B8EDE;
}
</style>