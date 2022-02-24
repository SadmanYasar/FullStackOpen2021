import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/api/ping', (_request, response) => {
    return response.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on  port ${PORT}`);
});