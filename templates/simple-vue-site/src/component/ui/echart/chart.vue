<template>
	<div class="chart" v-loading="loading">
		<div class="chart-detail" v-show="!isEmpty"></div>
		<div class="empty" v-show="isEmpty">
			<span>暂无数据</span>
		</div>
		<div class="extra">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import extend from '../../../javascript/util/extend.js';
import some from '../../../javascript/util/lodash-es/some.js';

function makeData () {
	return {
		isEmpty: false,
		options: {}
	}
}

export default {
	name: 'chart',
	props: {
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return makeData();
	},
	methods: {
		init() {
			this.chart = echarts.init($(this.$el).find('.chart-detail').get(0));
			this.updateOptioins();
			this.initialized = true;
		},
		updateOptioins() {
			// 处理echart在series数据为空时，不能清空画板的问题
			this.isEmpty = !some(this.options.series, (serie) => {
				return (serie.data && serie.data.length > 0) || (serie.markPoint && serie.markPoint.data && serie.markPoint.data.length > 1);
			});
			if(!this.isEmpty) {
				this.chart.setOption(this.options);
			}
		},
		refresh(options) {
			extend(this.options, options);
			if(!this.initialized) {
				this.init();
			} else {
				this.chart.clear();
				this.updateOptioins();
			}
		}
	},
	// keypoint：执行方法
	// “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
	mounted() {
		
	}
}
</script>
<style type="text/css">
.chart {
		min-height: 2rem;
}
.chart > .chart-detail {
		width: 100%;
		height: 100%;
		position: relative;
}
.chart .empty {
		text-align: center;
		height: 100%;
		font-size: 0.7rem;
}

.chart .empty span {
		display: block;
		position: absolute;
		width: 100%;
		top: 50%;
		margin-top: -0.35rem;
		color: #666;
}
</style>