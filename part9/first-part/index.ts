import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import { parseExcerciseArguments, calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
    response.send('Hello fullstack!');
});

app.get('/bmi', (request, response) => {
    const query = request.query;

    if (!query.height || !query.mass) {
        return response.status(400).send({ error: 'malformatted parameters' });
    }

    try {
        const { height, mass } = parseBmiArguments(
            Number(query.height), 
            Number(query.mass)
        );

        const result = calculateBmi(height, mass);
        return response.status(200).send({
            mass,
            height,
            bmi: result
        });
        
    } catch (error: unknown) {
        if(error instanceof Error) {
            return response.status(400).send({ error: error.message });  
        }

        return response.status(400).send({error: 'Could not handle requestuest'});
    }
});

app.post('/exercises', (request, response) => {
    console.log(request.body);
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const dailyExercises = request.body.daily_exercises;

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
    const dailyTarget = request.body.target;

    if (!dailyExercises || !dailyTarget) {
        return response.status(400).send({ error: 'parameters missing' });
    } else {
        try {
            const { target, dailyExerciseHours } = parseExcerciseArguments(
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
                dailyTarget, dailyExercises
            );
    
            return response.status(200).send(calculateExercises(target, dailyExerciseHours));
        } catch (e: unknown) {
            if (e instanceof Error) {
                return response.status(400).send({ error: e.message });
            }
    
            return response.status(400).send({ error: 'Could not handle request' });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});