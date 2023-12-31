const express = require('express');
const configure = require('configure');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => console.log(` localhost connected to:${PORT}`));