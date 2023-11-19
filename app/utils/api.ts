import * as authApi from '@/app/utils/userAuthenticationApi';
import * as userDataApi from '@/app/utils/userDataApi';

export const { getUserId, googleLogin } = authApi;
export const { getUserData } = userDataApi;