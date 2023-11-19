import axios from "axios";

const baseUrl = "https://localhost:7211";

interface UserData {
    username: string;
    profilePictureUrl: string;
}

export const getUserData = async (userId: string): Promise<UserData> => {
    try {
        const endpoint = `${baseUrl}/users/${userId}`;
        const userDataResponse = await axios.get(endpoint, { withCredentials: true });
    
        const username = userDataResponse.data['username'];
        const profilePictureUrl = userDataResponse.data['profilePictureUrl'];
    
        return { 
            username: username, 
            profilePictureUrl: profilePictureUrl 
        }
    } catch(error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};