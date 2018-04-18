<template>
	<ul class="simple-pager">
		<li class="item first-page" :disabled="disabledFirstPage" @click="goFirstPage">
			<icon name="page to-first-page"></icon>
		</li>
		<li class="item prev" :disabled="disabledPrev" @click="goPrev">
			<icon name="page to-prev-page"></icon>
		</li>
		<li class="item current">
			<input v-model="v_current" @keyup="goTo">
		</li>
		<li class="item gap">
			/
		</li>
		<li class="item total">
			{{totalPage}}页
		</li>
		<li class="item prev" :disabled="disabledNext" @click="goNext">
			<icon name="page to-next-page"></icon>
		</li>
		<li class="item last-page" :disabled="disabledLastPage" @click="goLastPage">
			<icon name="page to-last-page"></icon>
		</li>
		<li class="item total-desc">
			共 {{total}} {{unit}}
		</li>
	</ul>
</template>

<script>
import {pager as pagerEvent} from '../../../javascript/config/event.json';
import {isEnter} from '../../../javascript/util/keyEvent.js';

export default {
	name: 'simple-pager',
	props: {
		current: {
			type: Number,
			default: 1
		},
		totalPage: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: 10
		},
		unit: {
			type: String,
			default: '条'
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
	data() {
		return {
			v_current: 1
		}
	},
	methods: {
		toggle(idx) {
			this.$emit(pagerEvent.goto, idx);
		},
		goTo(ev) {
			if(isEnter(ev) && this.v_current >= 1) {
				this.doGoto(parseInt(this.v_current, 10));
			}
		},
		doGoto(page) {
			this.$emit(pagerEvent.goto, page);
		},
		goFirstPage() {
			if(!this.disabledFirstPage) {
				this.doGoto(1);
			}
		},
		goLastPage() {
			if(!this.disabledLastPage) {
				this.doGoto(this.totalPage);
			}
		},
		goPrev() {
			if(!this.disabledPrev) {
				this.doGoto(this.current - 1);
			}
		},
		goNext() {
			if(!this.disabledNext) {
				this.doGoto(this.current + 1);
			}
		}
	},
	computed: {
		disabledFirstPage() {
			return this.current <= 1;
		},
		disabledLastPage() {
			return this.current >= this.totalPage;
		},
		disabledPrev() {
			return this.current <= 1;
		},
		disabledNext() {
			return this.current >= this.totalPage;
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
	},
	mounted() {
		this.$watch('current', () => {
			this.v_current = this.current;
		}, {
			deep: true,
			immediatelly: true
		});
	}

}
</script>
<style>

.simple-pager > li {
line-height: 1rem;
		margin-right: 0.3rem;
		color: #f0f0f0;
		display: table-cell;
		vertical-align: top;
		padding-right: 0.2rem;
}

.simple-pager {
		line-height: 1rem;
		font-size: 0.7rem;
		display: table;
}

.simple-pager input {
		width: 2rem;
		text-align: center;
		padding: 0;
		height: 0.95rem;
		display: inline-block;
		border: 1px solid #525252;
		background-color: #232323;
		box-shadow: none;
		outline: none;
		box-sizing: border-box;
}

.simple-pager input:focus, .simple-pager input:active,.simple-pager input:hover {
		border-color: #999;
}

.simple-pager .icon {
		vertical-align: sub;
		transform: translateY(-0.05rem);
}

.simple-pager .to-first-page {
	background-image: url(../../../images/icon/common/page-last.png);
}
.simple-pager .to-prev-page {
	background-image: url(../../../images/icon/common/page-left.png);
}
.simple-pager .to-last-page {
	background-image: url(../../../images/icon/common/page-last.png);
	transform: translateY(0) rotate(180deg);
}
.simple-pager .to-next-page {
	background-image: url(../../../images/icon/common/page-left.png);
	transform: translateY(0) rotate(180deg);
}

.select-sku-modal .simple-pager .first-page:hover,
.select-sku-modal .simple-pager .last-page:hover,
.select-sku-modal .simple-pager .prev:hover,
.select-sku-modal .simple-pager .next:hover {
		transform: scale(1.05);
		cursor: pointer;
}
</style>