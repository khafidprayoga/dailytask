require('dotenv').config();
const app = require('../app');
const { HTTP_HOST, HTTP_PORT } = process.env;

app.listen(HTTP_PORT, HTTP_HOST, () => {
  console.log(`Applications running on http://${HTTP_HOST}:${HTTP_PORT}`);
});
