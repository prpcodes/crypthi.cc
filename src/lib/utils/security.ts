import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';
import { json } from '@sveltejs/kit';

export async function hashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

export async function checkPassword(password: string, hashedPassword: string): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}

export function encryptMessage(message: string, password: string): string {
	const ciphertext = CryptoJS.AES.encrypt(message, password);
	return ciphertext.toString();
}

export function decryptMessage(message: string, password: string): string {
	const bytes = CryptoJS.AES.decrypt(message, password);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);

	return originalText;
}

export async function checkIsValid(password: string | null, hash: string | null) {
	if (password === null || hash === null) {
		return json({ error: 'Invalid password' }, { status: 401 });
	}
	return checkPassword(password, hash);
}
