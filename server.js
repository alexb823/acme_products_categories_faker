const express = require('express');
const morgan = require('morgan');
const { syncAndSeed } = require('./db');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());


syncAndSeed()
.then(() => app.listen(port, ()=> console.log(`Listening on port ${port}`)))
