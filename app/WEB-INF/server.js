/**
 * 
 * Start a simple server on locathost and listen to port 5000;
 * 
 * ref: http://expressjs.com/en/4x/api.html
 * ref2: http://expressjs.com/en/starter/hello-world.html
 * 
 * @type Module express|Module express
 */

'use strict';

let express = require('express');
let path = require('path');
let app = express();
const PORT = 8000;
const HTTP_NOT_FOUND = 404;

//app.use(express.static('../pro-angular'));
let proAngularPath = path.join(__dirname, '../');
console.log(`serving ${proAngularPath} with express.js, listening on port number ${PORT}`);

app.use('/WEB-INF', (req, resp) => {
	resp.sendStatus(HTTP_NOT_FOUND);
});
app.use(express.static(proAngularPath));

app.listen(PORT);
