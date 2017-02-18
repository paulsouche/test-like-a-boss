import { app } from './app';
import * as http from 'http';

http.createServer(app)
  .listen(app.get('port'), () => console.info('Express server listening on port', app.get('port')));
