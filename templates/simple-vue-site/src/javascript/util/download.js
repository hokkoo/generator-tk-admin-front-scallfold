import generateDownloadUrl, {generateBlob} from './generateDownloadUrl.js';

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);
export default function download (url, name, param) {
	if(param) {
		url = url + '?' + $.param(param);
	}
	link.href = url;
	link.download = name || url;
	// link.dispatchEvent(new MouseEvent('click'));
	try {
		link.click();
	} catch(e) {
		console.log(e);
	}
}

const mimeMap = {
	csv : 'text/csv',
	txt: 'text/plain'
};

export function downloadContent(content, mime, name, param) {
	mime = mimeMap[mime] || mime;
	if(navigator.appVersion.toString().indexOf('.NET') > 0) {
		const blob = generateBlob(content, mime);
		window.navigator.msSaveBlob(blob, name);
	} else {
		const url = generateDownloadUrl(content, mime);
		download(url, name, param);
	}
}
