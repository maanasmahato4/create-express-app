import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(3000, () => {
	console.log('server running at http://localhost:3000');
});
