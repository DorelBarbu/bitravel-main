const app = require('./src/routes/router');
const Logger = require('./logger');
const db = require('./src/utils/db');

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await db;
    Logger.success(`Listening on port ${PORT}`);
  } catch(error) {
    Logger.err('Error connecting to database');
  }
});
