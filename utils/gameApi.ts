import GameState from "@/logic/attributes/GameState";
import Side from "@/logic/attributes/Side";
import Square from "@/logic/utilities/square";
import GameModel from "@/models/gameModel";
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

export const playMove = async (gameId: string, from: Square, to: Square, promotion?: string) => {
    try {
        const endpoint = `${baseUrl}/${gameId}/move`;

        axios.post(endpoint, { 
            from: { 
                rank: from.rank, 
                file: from.file 
            }, 
            to: { 
                rank: to.rank, 
                file: to.file 
            },
            promotion: promotion
        }, { withCredentials: true });
    } catch(error) {
        console.error('Error playing move:', error);
        throw error;
    }
}

export const getGame = async (gameId: string): Promise<GameModel> => {
    try {
        const endpoint = `${baseUrl}/${gameId}`;

        const response = await axios.get(endpoint);

        return {
            whiteSideUserId: response.data['whiteSideUserId'],
            blackSideUserId: response.data['blackSideUserId'],
            state: GameState[response.data['state'] as keyof typeof GameState],
            fen: response.data['fen'],
            sideToMove: Side[response.data['sideToMove'] as keyof typeof Side],
            castlingRightBlackKingSide: response.data['castlingRightBlackKingSide'] as boolean,
            castlingRightBlackQueenSide: response.data['castlingRightBlackQueenSide'] as boolean,
            castlingRightWhiteKingSide: response.data['castlingRightWhiteKingSide'] as boolean,
            castlingRightWhiteQueenSide: response.data['castlingRightWhiteQueenSide'] as boolean,
            enpassantSquare: response.data['enpassantSquare']
        }
    } catch(error) {
        console.error('Error fetching game:', error);
        throw error;
    }
}