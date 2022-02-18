interface BmiValues {
    height: number,
    mass: number
}

export const parseBmiArguments = (height: number, mass: number): BmiValues => {
    if (!isNaN(height) && !isNaN(mass)) {
        return {
            height: Number(height),
            mass: Number(mass)
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = (mass / (height * height)) * 10000;
    
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    } else if (bmi > 16 && bmi < 17 ) {
        return 'Underweight (Moderate thinness)';	
    } else if (bmi > 17 && bmi < 18.5 ) {
        return 'Underweight (Mild thinness)';	
    } else if (bmi > 18.5 && bmi < 25 ) {
        return 'Normal (healthy weight)';	
    } else if (bmi > 25 && bmi < 30 ) {
        return 'Overweight (Pre-obese)';	
    } else if (bmi > 30 && bmi < 35 ) {
        return 'Obese (Class I)';	
    } else if (bmi > 35 && bmi < 40 ) {
        return 'Obese (Class II)';	
    } else {
        return 'Obese (Class III)';	
    }
};

/* try {
    const {height, mass} = parseBmiArguments(
        Number(process.argv[2]), 
        Number(process.argv[3])
    );

    console.log(calculateBmi(height, mass));
    
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
 */