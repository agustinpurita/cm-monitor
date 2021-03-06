module.exports = {
    'env': {
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'semi': ['warn', 'always'],
        'no-unused-vars': 'warn',
        'quotes': [2, 'single', { 'avoidEscape': true }]
    }
};
