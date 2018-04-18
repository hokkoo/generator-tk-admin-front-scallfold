<template>
	<div class="pager-list">
		<div class="list" v-show="total > 0">
			<slot></slot>
		</div>
		<div class="empty" v-show="total <= 0">
			{{emptyTip}}
		</div>
		<pager v-show="showPager" :current="current" :total="total" :max="max" @pager-prev="goPrev" @pager-next="goNext" @pager-goto="gotTo"></pager>
	</div>
</template>

<script>
import Pager from '../pager/pager.vue';
import {pager as pagerEvent} from '../../../javascript/config/event.json';
export default {
	name: 'pager-list',
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
		showPager: {
			type: Boolean,
			default: true
		},
		emptyTip: {
			type: String,
			default: '暂无数据'
		}

	},
	methods: {
		gotTo(idx) {
			this.$emit(pagerEvent.goto, idx);
		},
		goPrev() {
			this.$emit(pagerEvent.prev);
		},
		goNext() {
			this.$emit(pagerEvent.next);
		}
	},
	components:{
		Pager
	}

}
</script>
<style>
	.pager-list {
position: relative;
		padding-bottom: 2rem;
}
.pager-list > .empty {
		text-align: center;
		color: #eee;
		font-size: 0.6rem;
}
.pager-list > .pager {
text-align: center;
		position: absolute;
		width: 100%;
		bottom: 0.5rem;
}
</style>