import { QueryParameters } from '../interface';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000';

export const API_CONFIG = {
  baseUrl: appBaseUrl,
  path: {
    login: 'auth/login',
    register: 'auth/register',
    family: 'family/members',
  },
};

export const getUrl = (url: string, params: QueryParameters = {}): string => {
  if (!url.includes('https')) {
    let urlString = `${API_CONFIG.baseUrl}/${url}`;
    if (params && !isEmpty(params)) {
      urlString += `?${queryString.stringify(params)}`;
    }
    return urlString;
  }

  return url;
};

export const IS_SERVER_LOCAL_STORAGE = typeof window !== 'undefined';
