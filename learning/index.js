const express = require('express');
const app = express();
const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares');
const userRouter = require('./routes/user');

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/practice-app-1');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('logs.txt'));

// ROUTES
app.use('/api/users', userRouter);

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
