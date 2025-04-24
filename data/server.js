const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

let players = [];

wss.on('connection', function connection(ws) {
    console.log('A new player has connected');
    
    // Add player to players list
    players.push(ws);

    // Broadcast input simulation to all players
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // Send the input to all players
        players.forEach(player => {
            if (player !== ws) {
                player.send(message);
            }
        });
    });

    // Handle player disconnecting
    ws.on('close', () => {
        console.log('A player has disconnected');
        players = players.filter(player => player !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
