import * as authApi from './userAuthenticationApi';
import * as userDataApi from './userDataApi';
import * as friendlistApi from './friendlistApi';

export const { getUserId, googleLogin } = authApi;
export const { getUserDataWithId, getUserDataWithUsername } = userDataApi;
export const { getFriends, getFriendRequests, getSentRequests } = friendlistApi;