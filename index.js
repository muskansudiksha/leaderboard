require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db/connect');
const socketHandlers = require('./socket/handlers');
const PlayerScore = require('./models/PlayerScore');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Basic route
app.get('/', (req, res) => {
  res.send('Leaderboard server is running!');
});

// Connect to DB and start server and then start cron
connectDB();
socketHandlers(io);
require('./jobs/resetScores');

//test
app.get('/test-leaderboard', async (req, res) => {
  const leaderboard = await PlayerScore.find({ })
    .sort({ score: -1 })
    .limit(10);
  res.json(leaderboard);
});

//update score test
app.use(express.json());
app.post('/test-update-score', async (req, res) => {
  const { playerId, score } = req.body;

  try {
    const updated = await PlayerScore.findOneAndUpdate(
      { playerId },
      { $set: { score } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Player not found' });

    res.json({ message: 'Score updated', player: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' Error updating score' });
  }
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
