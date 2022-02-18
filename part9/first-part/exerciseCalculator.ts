interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseExcerciseArguments = (target: number, args: Array<number>) => {
    if (args.some(isNaN) === false && isNaN(target) === false) {
        return {
            target,
            args
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (
    target: number,
    exerciseHours: Array<number>
): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(h => h > 0).length;
    const average = exerciseHours.reduce((p, c) => p + c) / periodLength;

    const success = average >= target;
    
    let rating, ratingDescription;

    if (average > target) {
        rating = 3;
        ratingDescription = 'excellent';
    } else if (average === target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better'
    } else {
        rating = 1;
        ratingDescription = 'task failed successfully'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

try {
  const {target, args} = parseExcerciseArguments(
      Number(process.argv[2]), 
      process.argv.slice(3).map(a => Number(a))
    );

  console.log(calculateExercises(target, args));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
}

module.exports = calculateExercises;