// server.js
const express = require('express');
const app = express();

app.use(express.static('public'));

const port = 9000;
app.listen(port);
console.log(`Server is running on port: ${port}`);