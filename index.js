var WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8080
});

const activeUsers = {
    1: [],
    2: [],
    3: []
};

wss.on('connection', (ws, req) => {
    ws.on('message', (rawMessage) => {
        const { type, payload } = JSON.parse(rawMessage);
        if (type === "ENTERED_ROOM") {
            activeUsers[payload].push(ws);
        } else if (type === "SEND_MESSAGE") {
            const { room, message } = payload;
            activeUsers[room].forEach(user => user.send(JSON.stringify({
                type: "RECEIVED_MESSAGE",
                payload: message
            })))
        }
    });
});
