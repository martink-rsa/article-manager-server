import * as http from 'http';
import app from './app';

const PORT = process.env.PORT;

http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
