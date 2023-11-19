import axios from "axios";

const baseUrl = "https://localhost:7121";

export const getUserId = async (): Promise<string | null> => {
    try {
        const endpoint = `${baseUrl}/auth/userId`;
        const userDataResponse = await axios.get(endpoint, { withCredentials: true });

        const userId = userDataResponse.data !== "" ? userDataResponse.data : null;

        return userId;
    } catch (error) {
        console.error('Error fetching userId:', error);
        throw error;
    }
};