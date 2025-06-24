# leaderboard
A backend service for a game that tracks players' scores in real-time and maintains a leaderboard.

# Features
-  Real-time player score updates via WebSockets
-  Fetch top N players on the leaderboard
-  Filter leaderboard by region and game mode
-  Daily leaderboard score resets using cron jobs
-  MongoDB Atlas for cloud-based NoSQL storage

# Tech Stack
- **Backend**: Node.js + Express
- **Realtime**: Socket.io
- **Database**: MongoDB (via Mongoose)
- **Scheduler**: node-cron
- **Deployment**: Render (https://leaderboard-dstp.onrender.com)

