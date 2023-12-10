import * as authApi from './userAuthenticationApi';
import * as userDataApi from './userDataApi';

export const { getUserId, googleLogin } = authApi;
export const { getUserData } = userDataApi;