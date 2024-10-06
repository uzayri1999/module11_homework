import { getPercents } from '../index.js';

describe('Вычисление процента', () => {
    it('успешное выполнение', () => {
        const percent = 30;
        const number = 200;
        expect(getPercents(percent, number)).toBe(`${percent}% от ${number} - это 60`);
    }),
    it('неуспешное выполнение', () => {
        const percent = 150;
        const number = 100;
        expect(getPercents(percent, number)).toBe(`результат вычисления ${percent}% от ${number} меньше 1 либо больше 100`);
    }),
    it('корнер-кейс', () => {
        const percent = 100;
        const number = 'str';
        expect(getPercents(percent, number)).toBe('один и/или оба аргумента не являются числом');
    });
});