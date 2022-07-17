import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi/:height?:weight?', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.send({
            error: 'malformatted parameters',
        });
    }
    res.send({
        height,
        weight,
        bmi: calculateBmi(weight, height),
    });
});

app.post('/calculate', (req, res) => {
    const daily_exercises: Array<number> = req.body.daily_exercises;
    const target: number = req.body.target;

    if (!daily_exercises || !target) {
        return res.status(400).send({
            error: 'parameters missing',
        });
    }

    if ([target, ...daily_exercises].some((hours) => isNaN(Number(hours)))) {
        return res.status(400).send({
            error: 'malformatted parameters',
        });
    }

    return res.send(calculateExercises([target, ...daily_exercises]));
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
