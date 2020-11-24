const apiCoin = require('../config/externals.config');

const buildOptionsPage = (page) => {
    return ({
        uri: `${apiCoin.info}?vs_currency=ars&per_page=250&page=${page}&sparkline=false`,
        method: 'GET',
        json: true,
    });
};

module.exports = {
    buildOptionsPage
};