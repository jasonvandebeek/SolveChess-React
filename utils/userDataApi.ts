import UserModel from "@/models/userModel";
import axios from "axios";

const baseUrl = "https://api.solvechess.xyz";



export const getUserData = async (userId: string): Promise<UserModel> => {
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