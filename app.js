const http =require('http')
const express =require('express')
const logger =require('morgan')
const bodyParser =require('body-parser')
const routes =require('./server/routes')
var jwt = require('jsonwebtoken'); 
const hostname = '127.0.0.1';
const port = 3000; 
var config = require('./server/config/config'); // get our config file


// Set up the express app
const app = express();

const server = http.createServer(app);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('superSecret', config.JWT_SECRET);


// app.use('/api',function(req, res, next) {
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if (token) {
//     jwt.verify(token,'karkun', function(err, decoded) {       
//             if (err) {
//         return res.json({ 
//                 success: false, message: 'Failed to authenticate token.' });       
//         } else {
//         req.decoded = decoded;         
//         next();
//       }
//     });

//   } else {
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });

//   }
// });


routes(app);

server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });

module.exports = app;



         