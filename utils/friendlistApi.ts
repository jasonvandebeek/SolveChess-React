import axios from "axios";

const baseUrl = "https://api.solvechess.xyz/friendlist";

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

export const getSentRequests = async (): Promise<string[]> => {
    try {
        const endpoint = `${baseUrl}/requests/outgoing`;
        const response = await axios.get(endpoint, { withCredentials: true });

        return response.data;
    } catch(error) {
        console.error('Error fetching sent requests:', error);
        throw error;
    }
};
