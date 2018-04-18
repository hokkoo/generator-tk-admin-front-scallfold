import JSEncrypt from '../lib/jsencrypt/jsencrypt.js';
import publicKey from '../config/publicKey.js';

let crypt;

crypt = new JSEncrypt();
crypt.setPublicKey(publicKey);


function base64save (input) {
	input = input || '';
	return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
}

export default function encrypt (input) {
	return crypt ? base64save(crypt.encrypt(input)) : input;
}