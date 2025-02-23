const express = require('express');
const cors = require('cors');
//const {swaggerUi, swaggerspecs} = require('./swagger');
const cookieParser = require('cookie-parser');
const apiRouter = require('./backend/routes/api');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());
app.use('/api/v1', apiRouter);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerspecs));

const ssl_options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};
const port = 8800;
const secure_port = 8443;

app.listen(port, () => { 
    console.log("Server is running on port" + port);
});

https.createServer(ssl_options, app).listen(secure_port, () => {
    console.log("Secure server is running on port" + secure_port);
});