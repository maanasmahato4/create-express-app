require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./database/db');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(3000, () => {
	console.log('server running at http://localhost:3000');
	connection();
});
