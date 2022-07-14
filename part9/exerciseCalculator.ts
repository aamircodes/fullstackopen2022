interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculator = (dailyHoursArr: Array<number>, target: number): Result => {
    const totalHours = dailyHoursArr.reduce((acc, current) => {
        return acc + current;
    }, 0);

    const average = totalHours / 7;
    const difference = target - average;

    let rating;
    let ratingDescription;

    switch (true) {
        case difference <= 0:
            rating = 1;
            ratingDescription = 'you have hit the target, well done!';
            break;
        case difference <= 0.5:
            rating = 2;
            ratingDescription = 'not too bad but could be better';
            break;
        default:
            rating = 3;
            ratingDescription = 'bad, you need to exercise more';
    }

    return {
        periodLength: dailyHoursArr.length,
        trainingDays: dailyHoursArr.filter((day) => day > 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(calculator([3, 0, 2, 4.5, 0, 3, 1], 2));
