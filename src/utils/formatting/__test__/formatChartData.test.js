/**
 * @file formatChartData.test.js
 * @brief Fichier de test pour la fonction formatChartData.
 */
import formatChartdata from '../formatChartData'

describe('when data is passed', () => {
    it('should round value when if found', () => {
        const data = {
            a: { value: 1.234 },
            b: { value: null },
            c: { value: 0 },
            d: { value: undefined },
            e: { value: '' },
            f: { foo: 'bar' },
        };
        let result = formatChartdata(data)
        const mockresult = {
            a: { value: 1.23 },
            b: { value: null },
            c: { value: 0 },
            d: { value: undefined },
            e: { value: '' },
            f: { foo: 'bar' },
        }
        expect(result).toEqual(mockresult)
    })
})