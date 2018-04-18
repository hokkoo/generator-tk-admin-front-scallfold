const availableUrls = [
	{
		type: 'express-realtime',
		url: '/pages/express/realtime.html'
	},
	{
		type: 'express-realtime',
		url: '/main/realtime'
	},
	{
		type: 'express-analysis',
		url: '/pages/express/analysis.html'
	},
	{
		type: 'express-analysis',
		url: '/main/express'
	},
	{
		type: 'storage-analysis',
		url: '/pages/storage/analysis.html'
	},
	{
		type: 'storage-analysis',
		url: '/main/storage'
	}
]
export default function checkFooterType () {
	let hash = location.hash;
	if(hash === '/login') {
		return false;
	}
	let pathname = location.pathname.toLowerCase();
	let status = false, type;
	availableUrls.some((item) => {
		if(pathname.indexOf(item.url) === 0) {
			status = true;
			type = item.type;
			return true;
		}
	});
	return status ? type : false;
}