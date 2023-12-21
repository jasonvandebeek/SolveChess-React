import axios from "axios";

const baseUrl = "https://api.solvechess.xyz/game";

export const createGame = async (friendId: string, whitePlayerId?: string) => {
    try {
        const endpoint = `${baseUrl}`;
        const response = await axios.post(endpoint, 
        {
            opponentUserId: friendId,
            whiteSideUserId: whitePlayerId
        }, { withCredentials: true });

        return response.data;
    } catch(error) {
        console.error('Error fetching userId:', error);
        throw error;
    }
}