/* eslint-disable no-undef */
const expect = require('chai').expect;
const { isValidPassword } = require('../../helpers/passwordValidator');

describe('password validator test', () => {
    
    it('should return false because receives short password', () => {
        result = isValidPassword('Hola123','exampleuser');
        expect(result).to.be.equal(false);
    });
    it('should return false because receives same password and username', () => {
        result = isValidPassword('exampleuser','exampleuser');
        expect(result).to.be.equal(false);
    });
    it('should return true because receives valid password', () => {
        result = isValidPassword('ValidPassword123','exampleuser');
        expect(result).to.be.equal(true);
    });
});