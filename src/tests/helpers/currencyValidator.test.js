/* eslint-disable no-undef */
const expect = require('chai').expect;
const isValidCurrency = require('../../helpers/currencyValidator');


describe('currency validator test', () => {
    it('should return true because receives valid currency', () => {
        result = isValidCurrency('ars');
        expect(result).to.be.equal(true);
    });
    it('should return false because receives valid currency', () => {
        result = isValidCurrency('mxn');
        expect(result).to.be.equal(false);
    });
});