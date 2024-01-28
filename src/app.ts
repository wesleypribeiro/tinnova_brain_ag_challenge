import express from 'express';
const app = express();
const PORT = 3000;
import routes from './routes';
import { initData } from './db';

app.use(express.json());

app.use('/produtores/', routes);

app.listen(PORT, () => {
  initData();
  return console.log(`Running at port ${PORT}`)
});