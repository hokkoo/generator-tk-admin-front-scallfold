const BOM = "\uFEFF";
export default function generateDownloadUrl (content, mime) {
	// Add BOM to text for open in excel correctly
	if (window.Blob && window.URL && window.URL.createObjectURL) {
		var csvData = new Blob([BOM + content], { type: mime});
		return URL.createObjectURL(csvData);
	} else {
		return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(content);
	}
}

export function generateBlob(content, mime) {
	if (window.Blob && window.URL && window.URL.createObjectURL) {
		return new Blob([BOM + content], { type: mime});
	}
}