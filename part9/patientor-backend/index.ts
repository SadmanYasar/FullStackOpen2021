import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/api/ping', (_request, response) => {
    return response.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on  port ${PORT}`);
});