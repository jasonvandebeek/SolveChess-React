import * as signalR from '@microsoft/signalr';

const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/websocket`;

export const getConnection = () => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(baseUrl)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    return connection;
}