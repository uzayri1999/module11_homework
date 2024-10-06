import { multy } from './index.js'

describe('111111', () => {
    it('multy 2 * 3 to equal 6', () => {
        expect(multy(2, 3)).toBe(6);
    }),
    it('multy 2 * 0 to equal 2', () => {
        expect(multy(2, 0)).toBe(0);
    })
})

describe('222222', () => {
    it('multy 2 * 5 to equal 10', () => {
        expect(multy(2, 5)).toBe(10);
    }),
    it('multy 2 * 11 to equal 22', () => {
        expect(multy(2, 11)).toBe(22);
    })
})