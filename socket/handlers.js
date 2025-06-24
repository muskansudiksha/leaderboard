const PlayerScore = require('../models/PlayerScore');

const socketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.on('update_score', async (data) => {
      try {
        const { playerId, region, mode, score } = data;

        await PlayerScore.findOneAndUpdate(
          { playerId, region, mode },
          {
            $max: { score },
            updatedAt: new Date(),
          },
          { upsert: true, new: true }
        );

        socket.emit('score_updated', { success: true });
      } catch (err) {
        console.error(err);
        socket.emit('score_updated', { success: false, error: 'Update failed' });
      }
    });

    socket.on('get_leaderboard', async ({ region, mode, topN = 10 }) => {
      try {
        const query = {};
        if (region) query.region = region;
        if (mode) query.mode = mode;
    
        const leaderboard = await PlayerScore.find(query)
          .sort({ score: -1 })
          .limit(topN)
          .select('playerId score region mode -_id')
          .lean();
    
        socket.emit('leaderboard_data', leaderboard);
      } catch (err) {
        console.error(err);
        socket.emit('leaderboard_data', []);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = socketHandlers;
