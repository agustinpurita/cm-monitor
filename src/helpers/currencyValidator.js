const currencies = ['EUR', 'USD', 'ARS'];

const isValidCurrency = (currency) => {
    const currencyUpperCase = currency.toUpperCase();
    return currencies.includes(currencyUpperCase);
};
module.exports = isValidCurrency;