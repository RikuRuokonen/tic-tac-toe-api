const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const compression = require('compression');
const gameRoutes = require('./routes/gameRoutes');

const result = dotenv.config();
if (result.error) {
  throw new Error(result.error);
}

const app = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(compression());

app.get('/api/test', (req, res) => res.json({ message: 'api setupped correctly' }));
app.use('/api/', gameRoutes);

app.listen(port, () => console.log(`Tic-tac-toe app listening on port ${port}!`));

module.exports = app;
