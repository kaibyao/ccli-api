import * as express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('Example app listening on port 3000!');
});
