require('dotenv').config();
let  server ;
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
