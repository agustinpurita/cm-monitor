const currencies = ['EUR','USD','ARS'];

const isValidCurrency = (currency) => currencies.includes(currency);

module.exports = isValidCurrency;