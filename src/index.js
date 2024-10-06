export function getPercents (percent, number) {
    const result = (number * percent) / 100;

    if (typeof percent === 'number' && typeof number === 'number') {

        // результат не может быть меньеше 1% и больше 100%
        if (1 <= result && result <= 100) {
            return `${percent}% от ${number} - это ${result}`;
        } else {
            return `результат вычисления ${percent}% от ${number} меньше 1 либо больше 100`;
        };

    } else {
        return 'один и/или оба аргумента не являются числом';
    };
};