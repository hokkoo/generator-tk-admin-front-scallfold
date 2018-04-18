export default function numberFormat (num) {
	return (num + '').replace(/(?=(?:\d{3})+(?!\d))/g, ',').replace(/^,/, '');
}