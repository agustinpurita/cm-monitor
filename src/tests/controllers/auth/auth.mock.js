const mockCreateUser = {
    name: 'example name',
    lastname: 'example lastname',
    username: 'auth username',
    password: 'exampleValidpw12',
    currency: 'ars',
};

const mockLoginUser = {
    username: mockCreateUser.username,
    password: mockCreateUser.password,
};
module.exports = {
    mockCreateUser,
    mockLoginUser
};