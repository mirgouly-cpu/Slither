const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

const players = new Map(); // In-RAM storage of player states

wss.on("connection", (ws) => {
  const playerId = Date.now(); // simple ID for demo
  console.log(`Player connected: ${playerId}`);

  // Add new player to memory
  players.set(playerId, {
    x: 0,
    y: 0,
    length: 10,
    direction: 0
  });

  ws.on("message", (msg) => {
    // Client input
    const input = JSON.parse(msg);
    const player = players.get(playerId);

    if (player && input.direction !== undefined) {
      player.direction = input.direction;
    }
  });

  ws.on("close", () => {
    console.log(`Player disconnected: ${playerId}`);
    players.delete(playerId);
  });
});

console.log("Server started on port " + (process.env.PORT || 8080));
