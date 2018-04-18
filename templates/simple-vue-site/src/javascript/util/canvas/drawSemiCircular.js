const rad = Math.PI / 100;
import isUndefined from '../lodash-es/isUndefined.js';

export default class DrawSemiCircular {
	constructor({ctx, width, height, lineWidth, lineCap = "round" , animate = true, backgroundColor = '#fff', progressColor = '#000', value = 0, step = 0.1}) {
		this.ctx = ctx;
		// 宽高比默认是 2:1
		this.width = width;
		this.height = height;
		this.lineCap = lineCap;
		this.lineWidth = lineWidth;
		this.animate = animate;
		this.backgroundColor = backgroundColor;
		this.progressColor = progressColor;
		this.value = value;
		this.step = step;
		this.progress = 0;
		this.init();
	}

	rect() {
		let width = this.width, height = this.height;
	}

	init() {
		this.draw();
	}
	draw() {
		requestAnimationFrame(() => {
			if(this.progress <= this.value) {
				this.draw();
				this.ctx.clearRect(0, 0, this.width, this.height);
				this.progress = this.animate ? (this.progress + this.step) : this.value;
				this.drawBackground();
				this.drawProgress();
			}
		})
	}

	reset() {
		this.progress = 0;
		this.value = 0;
	}

	start(value) {
		this.reset();
		this.value = value;
		this.draw();
	}

	drawBackground() {
		let ctx = this.ctx;
		ctx.save();
		ctx.lineWidth = this.lineWidth;
		ctx.lineCap = this.lineCap;
		ctx.strokeStyle = this.backgroundColor;
		ctx.beginPath();
		let gap = this.lineWidth / 2;
		ctx.arc(this.width / 2, this.height, this.height - gap, -Math.PI, -Math.PI * 2, false);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
	drawProgress() {
		let ctx = this.ctx;
		ctx.save();
		ctx.lineWidth =this.lineWidth;
		ctx.lineCap = this.lineCap;
		ctx.strokeStyle = this.progressColor;
		ctx.beginPath(); //路径开始
		let gap = this.lineWidth / 2;
		//用于绘制圆弧ctx.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
		ctx.arc(this.width / 2, this.height, this.height - gap, -Math.PI, -Math.PI + this.progress * rad, false);
		ctx.stroke(); //绘制
		ctx.closePath(); //路径结束
		ctx.restore();
		this.progress += this.step;
	}
}