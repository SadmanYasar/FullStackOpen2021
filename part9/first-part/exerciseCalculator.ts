interface ExerciseParams {
    target: number;
    dailyExerciseHours: Array<number>;
}

export const parseExcerciseArguments = (
    target: number, 
    dailyExerciseHours: Array<number>
    ): ExerciseParams => {

    if (isNaN(target) === true || dailyExerciseHours.some(isNaN) === true) {
        throw new Error('malformatted parameter(s)');
    } else {
        return {
            target: Number(target),
            dailyExerciseHours: dailyExerciseHours.map(e => Number(e))
        };
    }
};

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (
    target: number,
    exerciseHours: Array<number>
): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(h => h > 0).length;
    const average = exerciseHours.reduce((p, c) => p + c) / periodLength;

    const success = average >= target;
    
    let rating: number, ratingDescription: string;

    if (average > target) {
        rating = 3;
        ratingDescription = 'excellent';
    } else if (average === target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'task failed successfully';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};