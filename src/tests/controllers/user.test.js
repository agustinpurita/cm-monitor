/* eslint-disable no-undef */
let chai = require('chai');
let chaiHttp = require('chai-http');
const testConfig = require('../tests.config');
const expect = require('chai').expect;


chai.use(chaiHttp);
const url = 'http://localhost:3000/api';
const mockCreateUser = {
    name: 'example name',
    lastname: 'example lastname',
    username: 'example username',
    password: 'exampleValidpw12',
    currency: 'ars',
};
const mockUpdateUser = {
    'favcryptos': ['5fbc3852325685930b315400', '5fbc3852325685930b315401'],
    'currency': 'usd'
};

describe('Users CRUD', () => {
    let idUser;
    let tokenUser;
    after((done) => {
        chai.request(url)
            .delete(`/users/${idUser}`)
            .set('access-token', testConfig.token)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
            });
        done();
    });
    it('should create a user', (done) => {
        chai.request(url)
            .post('/users')
            .send(mockCreateUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                expect(res.body).to.have.property('user');
                idUser = res.body.user._id;
                tokenUser = res.body.token;
                done();
            });
    });
    it('should update a user', (done) => {
        chai.request(url)
            .put(`/users/${idUser}`)
            .set('access-token', tokenUser)
            .send(mockUpdateUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                expect(res.body).to.have.property('user');
                done();
            });
    });
    it('should get all users', (done) => {
        chai.request(url)
            .get('/users')
            .end((err, res) => {
                console.log(res.body)
                expect(res.body).to.have.property('ok').to.be.equal(true);
                done();
            });
    });
});