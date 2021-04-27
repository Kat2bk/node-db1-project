const express = require("express");
const accountsRouter = require('../api/accounts/accounts-router');

const server = express();

server.use(express.json());

//to test error middleware
// server.all( '*', function( req, res ){
//     throw new Error('oops something went wrong')
// });

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the API home page');
})

server.use(function(err, req, res, next) {
    console.error(err.stack)
    res.json({statusCode: 500, message: err.message});
  })

module.exports = server;
