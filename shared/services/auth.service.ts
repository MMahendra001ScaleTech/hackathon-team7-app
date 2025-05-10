'use client';

import CryptoJS from 'crypto-js';
import { IUserData } from '@/shared/interface/auth';
import { IS_SERVER_LOCAL_STORAGE } from '@/shared/constants/constant';

const KEY = process.env.NEXT_PUBLIC_ENCRYPTION_API_KEY || '';

let token = '';
// let intercomHash = '';

/**
 * function to check if user is logged in or not
 */
export const checkLogin = (): boolean => {
	return IS_SERVER_LOCAL_STORAGE && localStorage.authInfo && localStorage.userInfo;
};

/**
 * function to get user access token
 */
const getAccessToken = (): boolean | string => {
	if (token && token !== '') {
		return token;
	}
	try {
		const data = IS_SERVER_LOCAL_STORAGE && localStorage.authInfo;
		if (data) {
			const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			token = decryptedData ? decryptedData : false;
			return token;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

/**
 * function to get user data
 */
const getUserData = (): IUserData => {
	try {
		const data = IS_SERVER_LOCAL_STORAGE && localStorage.userInfo;
		if (data) {
			const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
			const decryptedData: IUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			if (!decryptedData) {
				return {} as IUserData;
			}
			return decryptedData;
		} else {
			return {} as IUserData;
		}
	} catch (error) {
		return {} as IUserData;
	}
};

/**
 * function to set user authentication data
 */
const setAuthData = (data: string): void => {
	token = data;
	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
	IS_SERVER_LOCAL_STORAGE && localStorage.setItem('authInfo', cipherText.toString());
};

/**
 * function to set user detail
 */
const setUserData = (data: IUserData): void => {
	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
	IS_SERVER_LOCAL_STORAGE && localStorage.setItem('userInfo', cipherText.toString());
};

/**
 * function to remove user authentication data
 */

const removeAuthData = (): void => {
	IS_SERVER_LOCAL_STORAGE && localStorage.removeItem('authInfo');
	IS_SERVER_LOCAL_STORAGE && localStorage.removeItem('userInfo');
	token = '';
};

const getSessionData = (): any => {
	return IS_SERVER_LOCAL_STORAGE && sessionStorage.getItem('showLoader');
};

const setSessionData = (data: string): void => {
	IS_SERVER_LOCAL_STORAGE && sessionStorage.setItem('showLoader', data);
};

const generateUserHash = (id: string) => {
	const hash = CryptoJS.HmacSHA256(id, 'kYeOTa2xx3DxKjsLB9cJj43k7ZrdZk5XsijucP8N');
	const hashInHex = CryptoJS.enc.Hex.stringify(hash);
	// intercomHash = hashInHex;
	return hashInHex;
	// return intercomHash;
};

const AuthService = {
	checkLogin: checkLogin,
	getAccessToken: getAccessToken,
	setAuthData: setAuthData,
	removeAuthData: removeAuthData,
	setUserData: setUserData,
	getUserData: getUserData,
	generateUserHash: generateUserHash,
	getSessionData: getSessionData,
	setSessionData: setSessionData
};
export default AuthService;
