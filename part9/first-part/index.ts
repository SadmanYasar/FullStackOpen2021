import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import { parseExcerciseArguments, calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello fullstack!');
});

app.get('/bmi', (req, res) => {
    const query = req.query;

    if (!query.height || !query.mass) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    try {
        const { height, mass } = parseBmiArguments(
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

app.post('/exercises', (req, res) => {
    console.log(req.body);
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const dailyExercises = req.body.daily_exercises;

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
    const dailyTarget = req.body.target;

    if (!dailyExercises || !dailyTarget) {
        return res.status(400).send({ error: 'parameters missing' });
    } else {
        try {
            const { target, dailyExerciseHours } = parseExcerciseArguments(
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
                dailyTarget, dailyExercises
            );
    
            return res.status(200).send(calculateExercises(target, dailyExerciseHours));
        } catch (e: unknown) {
            if (e instanceof Error) {
                return res.status(400).send({ error: e.message });
            }
    
            return res.status(400).send({ error: 'Could not handle request' });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});