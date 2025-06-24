const cron = require('node-cron');
const PlayerScore = require('../models/PlayerScore');

// Runs every day at midnight IST
cron.schedule('0 0 * * *', async () => {
  try {
    await PlayerScore.updateMany({}, { $set: { score: 0 } });
    console.log('Daily scores reset to 0');
  } catch (err) {
    console.error('Failed to reset scores:', err);
  }
}, {
  timezone: 'UTC'
});
