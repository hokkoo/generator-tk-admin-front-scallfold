<template>
	<div role="dialog"
		v-bind:class="{
		'vue-strap-modal': true,
		'modal':true,
		'fade':effect === 'fade',
		'zoom':effect === 'zoom'
		}"
		>
		<div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
			v-bind:style="{width: optionalWidth}">
			<div class="modal-content">
				<slot name="modal-header">
					<div class="modal-header" v-show="showHeader">
						<button type="button" class="close" @click="close"></button>
						<h4 class="modal-title">
							<slot name="title">
								{{title}}
							</slot>
						</h4>
					</div>
				</slot>
				<slot name="modal-body">
					<div class="modal-body"></div>
				</slot>
				<slot name="modal-footer">
					<div class="modal-footer" v-show="showFooter">
						<button type="button" class="btn btn-default" @click="close">{{ cancelText }}</button>
						<button type="button" class="btn btn-primary" @click="callback">{{ okText }}</button>
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
import {coerce, getScrollBarWidth} from './utils/utils.js'

export default {
	props: {
		okText: {
			type: String,
			default: 'Save changes'
		},
		cancelText: {
			type: String,
			default: 'Close'
		},
		title: {
			type: String,
			default: ''
		},
		show: {
			required: true,
			type: Boolean,
			default: true
		},
		showHeader: {
			type: Boolean,
			default: true
		},
		showFooter: {
			type: Boolean,
			default: true
		},
		width: {
			default: null
		},
		callback: {
			type: Function,
			default () {}
		},
		effect: {
			type: String,
			default: null
		},
		backdrop: {
			type: Boolean,
			coerce: coerce.boolean,
			default: true
		},
		large: {
			type: Boolean,
			coerce: coerce.boolean,
			default: false
		},
		small: {
			type: Boolean,
			coerce: coerce.boolean,
			default: false
		}
	},
	computed: {
		optionalWidth () {
			if (this.width === null) {
				return null
			} else if (Number.isInteger(this.width)) {
				return this.width + 'px'
			}
			return this.width
		}
	},
	watch: {
		show (val) {
			const el = this.$el
			const body = document.body
			const scrollBarWidth = getScrollBarWidth()
			if (val) {
				$(el).find('.modal-content').focus()
				el.style.display = 'block'
				setTimeout(() => $(el).addClass('in'), 0)
				$(body).addClass('modal-open')
				if (scrollBarWidth !== 0) {
					body.style.paddingRight = scrollBarWidth + 'px'
				}
			} else {
				body.style.paddingRight = null
				$(body).removeClass('modal-open')
				$(el).removeClass('in');
				$(el).off('click transitionend')
				el.style.display = 'none'
				this.$emit('close', true);
			}
		}
	},
	methods: {
		init() {
			const el = this.$el
			$('body').on('click', el, e => {
				if (this.show && e.target === el) {
					this.doClose();
				}
			})
			
		},
		close () {
			this.doClose();
		},
		doClose() {
			this.$emit('close', true);
		}
	},
	mounted() {
		this.init	();
	}
}
</script>
<style>
.modal {
	transition: all 0.3s ease;
}
.modal.in {
	background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
	-webkit-transform: scale(0.1);
	-moz-transform: scale(0.1);
	-ms-transform: scale(0.1);
	transform: scale(0.1);
	top: 300px;
	opacity: 0;
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	transform: scale(1);
	-webkit-transform: translate3d(0, -300px, 0);
	transform: translate3d(0, -300px, 0);
	opacity: 1;
}

.modal .modal-header {
background-color: #fff;
    border-bottom: 1px solid #ddd;
    font-size: 0.8rem;
    padding: 1rem 0;
    margin: 0 1.5rem;
    color: #333;
}

.modal-content .modal-body {
    padding: 1.25rem 1rem;
}

.modal .modal-header .close:before {
    background-color: transparent;
    width: 0.8rem;
    height: 0.8rem;
    /*background-image: url(/assets/images/icons/close.png);*/
}

.modal-header .close {
    width: 1rem;
    height: 1rem;
    margin: 0;
    position: relative;
    
}
.modal .modal-footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
    margin: 0 1.5rem;
}

.vue-strap-modal .modal-header .close {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANBAMAAACAxflPAAAAHlBMVEUAAACAgICDg4OCgoKCgoKDg4OCgoKAgICCgoKDg4NW3lFCAAAACXRSTlMAJOXj059JSKECXAPWAAAAUUlEQVQI12NoEWBgYBAJYPBUZGBg1HRgEJokwCA0WQDIVmTUNGRgAAokAbkgyZlALhBkzixggPAVgRRQcRFQC5BrCNQC4gqAzfA0hJgXAjEfAOzNDkO0D+R9AAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
    opacity: 0.6;
    top: -0.4rem;
}
</style>