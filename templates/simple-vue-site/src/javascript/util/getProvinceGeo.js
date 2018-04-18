import chinaProviceGeoCoord from '../config/chinaProviceGeoCoord.json';
export default function getProvinceGeo (province) {
	return chinaProviceGeoCoord[province] || chinaProviceGeoCoord[province + '省'];
}