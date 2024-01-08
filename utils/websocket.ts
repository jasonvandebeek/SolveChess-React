import * as signalR from '@microsoft/signalr';

const baseUrl = `${process.env.API_ENDPOINT || "https://api.solvechess.xyz"}/websocket`;

export const getConnection = () => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(baseUrl)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    return connection;
}