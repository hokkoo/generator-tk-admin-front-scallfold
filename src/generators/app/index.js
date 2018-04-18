import path from 'path';
import 	{Base} from 'yeoman-generator';
import copyTemplates from '../utils/copyTemplates.js';
import findRoot from 'find-root';

class Generator extends Base {
	constructor(...args) {
		super(...args);
		this.sourceRoot(findRoot(__dirname));
		this.log(`source: ${this.sourceRoot()}`)
	}

	prompting() {
		var prompts = [{
			name: 'projectName',
			message: '输入应用名称（如 helloworld）',
			default: 'helloworld'
		}];
		return this.prompt(prompts).then(props => {
			this.name = props.projectName;
			this.dir = path.join(process.cwd(), this.name);

			this.log(`name: ${this.name}`)
			this.log(`dir: ${this.dir}`)

			return Promise.resolve();
		}, err => {
			this.log('error', JSON.stringify(err, null, 2));
		});
	}

	writing() {
		try {
			const src = path.join(this.sourceRoot(), './templates/simple-vue-site');
			this.log(`src: ${this.sourceRoot()}`)
			copyTemplates(src, this.dir).then((rtn) => {
				this.log(`初始化成功！！\n 成功创建 ${this.name}`)
			});
			
		} catch(err) {
			this.log('error', JSON.stringify(err, null, 2));
		}
	}

}

module.exports = Generator;