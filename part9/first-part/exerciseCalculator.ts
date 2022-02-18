interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (
    exerciseHours: Array<number>,
    target: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
module.exports = calculateExercises;