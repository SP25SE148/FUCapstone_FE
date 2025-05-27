import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (token: string) => {
    if (connection) {
        console.log("Kết nối SignalR đã tồn tại.");
        return connection; // Không tạo mới nếu đã có kết nối
    }

    connection = new signalR.HubConnectionBuilder()
        // .withUrl(`https://localhost:8000/notifications?access_token=${token}`, {
        .withUrl(`https://fucapstone-be-gateway.onrender.com/notifications?access_token=${token}`, {
            withCredentials: false
        })
        .withAutomaticReconnect()
        .build()

    try {
        await connection.start();
        console.log("✅ SignalR Connected");
    } catch (err) {
        console.error("❌ SignalR Connection Error: ", err);
    }

    return connection;
};

export const stopSignalRConnection = async () => {
    if (connection) {
        await connection.stop();
        console.log("🛑 SignalR Disconnected");
        connection = null;
    }
};

export const getSignalRConnection = () => connection;
