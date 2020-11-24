/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../config/server.config');
const expect = require('chai').expect;
const { mockUpdateUser, mockCreateUser } = require('./user.mocks');
chai.use(chaiHttp);

describe('Users controller', () => {
    const url = `http://localhost:${server.port}/api`;
    let idUser;
    let tokenUser;
    after((done) => {
        chai.request(url)
            .delete(`/users/${idUser}`)
            .set('access-token', tokenUser)
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
                expect(res.body).to.have.property('ok').to.be.equal(true);
                done();
            });
    });
    it('should get an user', (done) => {
        chai.request(url)
            .get(`/users/${idUser}`)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                done();
            });
    });
});