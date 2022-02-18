import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello fullstack!');
});

app.get('/bmi', (req, res) => {
    const query = req.query;

    if (!query.height || !query.mass) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    try {
        const {height, mass} = parseBmiArguments(
            Number(query.height), 
            Number(query.mass)
        );

        const result = calculateBmi(height, mass);
        return res.status(200).send({
            mass,
            height,
            bmi: result
        });
        
    } catch (error: unknown) {
        if(error instanceof Error) {
            return res.status(400).send({ error: error.message });  
        }

        return res.status(400).send({error: 'Could not handle request'});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});