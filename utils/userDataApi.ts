import UserModel from "@/models/userModel";
import axios from "axios";

const baseUrl = "https://api.solvechess.xyz";

export const getUserDataWithId = async (userId: string): Promise<UserModel> => {
    try {
        const endpoint = `${baseUrl}/users/${userId}`;
        const userDataResponse = await axios.get(endpoint, { withCredentials: true });
    
        const username = userDataResponse.data['username'];
        const rating = userDataResponse.data['rating'];
        const profilePictureUrl = userDataResponse.data['profilePictureUrl'];
    
        return { 
            userId: userId,
            username: username, 
            rating: rating,
            profilePictureUrl: profilePictureUrl 
        }
    } catch(error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getUserDataWithUsername = async (username: string): Promise<UserModel | null> => {
    try {
        const endpoint = `${baseUrl}/users?username=${username}`;
        const userDataResponse = await axios.get(endpoint, { withCredentials: true });
    
        const userId = userDataResponse.data['userId'];
        const rating = userDataResponse.data['rating'];
        const profilePictureUrl = userDataResponse.data['profilePictureUrl'];
    
        return { 
            userId: userId,
            username: username, 
            rating: rating,
            profilePictureUrl: profilePictureUrl 
        }
    } catch(error) {
        return null;
    }
}