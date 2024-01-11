import axios from "axios";

const baseUrl = `${process.env.API_ENDPOINT}/friendlist`;

export const getFriends = async (): Promise<string[]> => {
    try {
        const endpoint = `${baseUrl}`;
        const response = await axios.get(endpoint, { withCredentials: true });

        return response.data;
    } catch(error) {
        console.error('Error fetching friendlist:', error);
        throw error;
    }
};

export const getFriendRequests = async (): Promise<string[]> => {
    try {
        const endpoint = `${baseUrl}/requests/incoming`;
        const response = await axios.get(endpoint, { withCredentials: true });

        return response.data;
    } catch(error) {
        console.error('Error fetching friend requests:', error);
        throw error;
    }
};

export const getSentFriendRequests = async (): Promise<string[]> => {
    try {
        const endpoint = `${baseUrl}/requests/outgoing`;
        const response = await axios.get(endpoint, { withCredentials: true });

        return response.data;
    } catch(error) {
        console.error('Error fetching sent requests:', error);
        throw error;
    }
};

export const addFriend = async (userId: string) => {
    try {
        const endpoint = `${baseUrl}/requests/${userId}`;
        await axios.post(endpoint, null, { withCredentials: true });
    } catch(error) {
        console.error('Error sending friend request:', error);
        throw error;
    }
}

export const acceptFriendRequest = async (userId: string) => {
    try {
        const endpoint = `${baseUrl}/requests/${userId}/accept`;
        await axios.post(endpoint, null, { withCredentials: true });
    } catch(error) {
        console.error('Error accepting friend request:', error);
        throw error;
    }
}

export const denyFriendRequest = async (userId: string) => {
    try {
        const endpoint = `${baseUrl}/requests/${userId}/deny`;
        await axios.post(endpoint, null, { withCredentials: true });
    } catch(error) {
        console.error('Error denying friend request:', error);
        throw error;
    }
}

export const revokeFriendRequest = async (userId: string) => {
    try {
        const endpoint = `${baseUrl}/requests/${userId}`;
        await axios.delete(endpoint, { withCredentials: true });
    } catch(error) {
        console.error('Error revoking friend request:', error);
        throw error;
    }
}

export const removeFriend = async (userId: string) => {
    try {
        const endpoint = `${baseUrl}/${userId}`;
        await axios.delete(endpoint, { withCredentials: true });
    } catch(error) {
        console.error('Error removing friend request:', error);
        throw error;
    }
}