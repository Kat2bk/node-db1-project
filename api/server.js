const express = require("express");
const accountsRouter = require('../api/accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the API home page');
})

server.use((err, req, res, next) => {
    console.log(err)
    res.send(500, 'Something went wrong, try again')
})

module.exports = server;
