const mongoose = require('mongoose');

const PlayerScoreSchema = new mongoose.Schema({
  playerId: {type: Number,required: true,unique: true},
  name: {type: String,required: true},
  region: { type: String, required: true },
  mode:   { type: String, required: true },
  score:  { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

// Compound index to help with leaderboard lookups
PlayerScoreSchema.index({ region: 1, mode: 1, score: -1 });

module.exports = mongoose.model('PlayerScore', PlayerScoreSchema);
