/* eslint-disable no-undef */
const expect = require('chai').expect;
const apiCoin = require('../../config/externals.config');
const { buildOptionsPage } = require('../../helpers/cryptoHandler');

describe('crypto handler test', () => {
    const expectedUri = `${apiCoin.info}?vs_currency=ars&per_page=250&page=5&sparkline=false`;
    it('should return correct page', () => {
        result = buildOptionsPage(5);
        expect(result).to.have.property('uri').to.be.equal(expectedUri);
    });
});


