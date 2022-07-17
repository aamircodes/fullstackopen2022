interface BMIValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (a: number, b: number) => {
    const bmi = Math.round((b / Math.pow(a / 100, 2)) * 10) / 10;

    switch (true) {
        case bmi < 18:
            return 'Underweight';
        case bmi < 24.9:
            return 'Normal (healthy weight)';
        case bmi < 29.9:
            return 'Overweight';
        default:
            return 'Obese';
    }
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi };
