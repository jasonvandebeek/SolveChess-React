import * as authApi from './userAuthenticationApi';
import * as userDataApi from './userDataApi';
import * as friendlistApi from './friendlistApi';
import * as gameApi from './gameApi';

export const { getUserId, googleLogin, logout } = authApi;
export const { getUserDataWithId, getUserDataWithUsername } = userDataApi;
export const { getFriends, getFriendRequests, getSentFriendRequests, addFriend, acceptFriendRequest, denyFriendRequest, revokeFriendRequest, removeFriend } = friendlistApi;
export const { createGame } = gameApi;