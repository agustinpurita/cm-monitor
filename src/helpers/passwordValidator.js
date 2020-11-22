const passwordValidator = require('password-validator');

const isValidPassword = (password, user) => {
    
    const schemaPassword = new passwordValidator();

    schemaPassword
        .is().min(8)
        .is().max(50)
        .has().digits(1)
        .has().not().spaces()
        .is().not().oneOf([`${user}`]);

    return schemaPassword.validate(password);
};

module.exports = isValidPassword;