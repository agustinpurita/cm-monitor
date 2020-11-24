/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { mockCreateUser, mockLoginUser } = require('./auth.mock');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('Auth controller', () => {
    const url = 'http://localhost:3000/api';
    let idUser;
    let tokenUser;
    before((done) => {
        chai.request(url)
            .post('/users')
            .send(mockCreateUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                idUser = res.body.user._id;
                tokenUser = res.body.token;
                done();
            });
    });
    after((done) => {
        chai.request(url)
            .delete(`/users/${idUser}`)
            .set('access-token', tokenUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
            });
        done();
    });
    it('should get user token', (done) => {
        chai.request(url)
            .post('/login')
            .send(mockLoginUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                expect(res.body).to.have.property('token');
                done();
            });
    });
});