/**
 * @file effects.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { capitalizeFirstLetter, pipe, setStringToLowAndNormal } from '../effects';

describe('lower case function', () => {
    it('should convert a string that have uper cases letters to lower cases', () => {
        let string = "Hello There !"
        let result = setStringToLowAndNormal(string)
        expect(result).toBe("hello there !")
    })
    it('should do nothing', () => {
        let string = "hello there !"
        let result = setStringToLowAndNormal(string)
        expect(result).toBe("hello there !")
    })
    it('should convert all the letters of the string', () => {
        let string = "HELLO THERE !"
        let result = setStringToLowAndNormal(string)
        expect(result).toBe("hello there !")
    })
})

describe('pipe function', () => {
    it('should apply a series of functions to a value', () => {
        const addOne = (x) => x + 1;
        const double = (x) => x * 2;
        const square = (x) => x * x;

        const piped = pipe(addOne, double, square);
        expect(piped(2)).toBe(36);
    });
});

describe('capitalizeFirstLetter function', () => {
    it('should set the first letter to a capitar letter', () => {
        let string = "hello there !"
        let result = capitalizeFirstLetter(string)
        expect(result).toBe("Hello there !")
    })
})

