import GameState from "@/logic/attributes/GameState";
import Side from "@/logic/attributes/Side";
import Square from "@/logic/utilities/square";

export default interface GameModel {
    whiteSideUserId: string,
    blackSideUserId: string,
    state: GameState,
    fen: string,
    sideToMove: Side,
    castlingRightBlackKingSide: boolean,
    castlingRightBlackQueenSide: boolean,
    castlingRightWhiteKingSide: boolean,
    castlingRightWhiteQueenSide: boolean,
    enpassantSquare: Square | null
}