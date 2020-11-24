/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../config/server.config');
const mockCreateUser = require('./cryptos.mock');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('Cryptos controller', () => {
    const url = `http://localhost:${server.port}/api`;
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
    it('should get all cryptos', (done) => {
        chai.request(url)
            .get('/cryptos')
            .set('access-token', tokenUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                expect(res.body).to.have.property('response');
                done();
            });
    });
    it('should get avaiable cryptos for fav', (done) => {
        chai.request(url)
            .get('/cryptos/avaiablefav')
            .set('access-token', tokenUser)
            .end((err, res) => {
                expect(res.body).to.have.property('ok').to.be.equal(true);
                expect(res.body).to.have.property('cryptos');
                done();
            });
    });
});

