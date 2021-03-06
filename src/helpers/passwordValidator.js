const passwordValidator = require('password-validator');
const bcrypt = require('bcryptjs');

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

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

module.exports = {
    isValidPassword,
    encryptPassword,
    comparePassword,
};