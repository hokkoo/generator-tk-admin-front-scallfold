<template>
	<span class="countdown" :disabled="disabled">
		<span class="normal" v-if="counting === 0" @click="beforeStart">
			{{normalText}}
		</span>
		<span class="before" v-if="counting === 1">
			{{beforeText}}
		</span>
		<span class="counting" v-if="counting === 2">
			{{countingText}} <span class="unit">s</span>
		</span>
		<span class="retry" v-if="counting === 3" @click="retry">
			{{retryText}} 
		</span>
	</span>
</template>
<script>
	// 倒计时
	import delay from '../../../javascript/util/delay.js';

	import {countdown as countdownEvent} from '../../../javascript/config/event.json';

	export default {
		name: 'countdown',
		props: {
			normalText: {
				type: String,
				default: '点击'
			},
			beforeText: {
				type: String,
				default: '发送中'
			},
			retryText: {
				type: String,
				default: '重新获取验证码'
			},
			// 允许再次获取
			repeat: {
				type: Boolean,
				default: true
			},
			duration: {
				type: Number,
				default: 60
			}
		},
		data() {
			return {
				disabled: false,
				time: 0,
				counting: 0 //0，未计时；1，已触发，准备计时；2，计时中；3，计时完成；
			}
		},
		computed: {
			countingText() {
				const status = this.counting;
				if(status === 2) {
					let time = this.duration - this.time;
					time = time < 0 ? 0: time;
					return time;
				}
			}
		},
		methods: {
			beforeStart() {
				this.reset();
				this.counting = 1;
				this.$emit(countdownEvent.before);
			},
			stop() {
				this.ticker && this.ticker();
				this.time = 0;
			},
			start() {
				this.stop();
				this.counting = 2;
				return new Promise((resolve) => {
					this.$emit(countdownEvent.start);
					const coundown = () => {
						this.time++;
						if(this.time >= this.duration) {
							this.$emit(countdownEvent.stop);
							this.stop();
							this.counting = 3;
							resolve();
						} else {
							this.ticker = delay(() => {
								coundown();
							}, 1)
						}
					}
					coundown();
				});
			},
			reset() {
				this.stop();
				this.counting = 0;
			},
			retry() {
				this.beforeStart();
			}
		}
	};
</script>
<style>
.countdown {
		display: inline-block;
		padding: 0.3rem 1rem;
		border: 1px solid #ddd;
		border-radius: 0.2rem;
		color: #666;
		cursor: pointer;
}
</style>