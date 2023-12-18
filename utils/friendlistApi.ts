import axios from "axios";

const baseUrl = "https://api.solvechess.xyz";

export const getFriends = async (): Promise<string[]> => {
    try {
        const endpoint = `${baseUrl}/friendlist`;
        const response = await axios.get(endpoint, { withCredentials: true });

        return response.data;
    } catch(error) {
        console.error('Error fetching friendlist:', error);
        throw error;
    }
};
