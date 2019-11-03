const request = require('request');
const should = require('should');
const chai = require('chai');

const expect = chai.expect;

const url = 'http://localhost:10082';

const pais = {
    name: 'Brasil',
    alpha3Code: 'BRA',
    population: 206135893,
    currencies: [{ name:'Real' }],
    languages: [{ name:'Português' }],
}

const paisIncompleto = {
    currencies: [{ name:'Real' }],
    languages: [{ name:'Português' }],
}

describe('API Desafio Zoop Test', function() {
    describe('Lista de todos os países - GET /paises', function() {
        it('Retorna array e status 200', function(done) {
            request.get(`${url}/paises`, function(error, response, body) {
                let _body = {};
                try {
                    _body = JSON.parse(body);
                }
                catch(e) {
                    _body = body;
                }
                expect(_body).to.be.an('array');
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    describe('Busca de país por nome - GET /paises/:nome', function() {
        it('Retorna objeto e status 200', function(done) {
            request.get(`${url}/paises/brazil`, function(error, response, body) {
                paisRetornado = body;
                let _body = {};
                try {
                    _body = JSON.parse(body);
                }
                catch(e) {
                    _body = body;
                }
                expect(response.statusCode).to.equal(200);
                expect(_body).to.have.property('name');
                expect(_body).to.have.property('alpha3Code');
                expect(_body).to.have.property('population');
                if (_body.should.have.property('languages')) expect(_body.languages).to.have.lengthOf.at.most(1);
                if (_body.should.have.property('currencies')) expect(_body.languages).to.have.lengthOf.at.most(1);
                expect(_body.name).to.equal('Brazil');
                expect(_body.alpha3Code).to.equal('BRA');
                expect(_body.population).to.equal(206135893);

                describe('Busca de país por ID - GET /pais/:id', function() {
                    it('Retorna objeto e status 200', function(done) {
                        
                        request.get(`${url}/pais/${_body._id}`, function(error, response, bodyGet) {
                            let _bodyGet = {};
                            try {
                                _bodyGet = JSON.parse(bodyGet);
                            }
                            catch(e) {
                                _bodyGet = {};
                            }
                            expect(response.statusCode).to.equal(200);
                            expect(_bodyGet).to.have.property('name');
                            expect(_bodyGet).to.have.property('alpha3Code');
                            expect(_bodyGet).to.have.property('population');
                            if (_bodyGet.should.have.property('languages')) expect(_bodyGet.languages).to.have.lengthOf.at.most(1);
                            if (_bodyGet.should.have.property('currencies')) expect(_bodyGet.languages).to.have.lengthOf.at.most(1);
                            expect(_bodyGet.name).to.equal('Brazil');
                            expect(_bodyGet.alpha3Code).to.equal('BRA');
                            expect(_bodyGet.population).to.equal(206135893);
            
                            done();
                        });
                    });
                    it('Retorna status 404 - País não encontrado', function(done) {
                        request.get(`${url}/pais/5dbede7c8fa5531620362715`, function(error, response, body) {
                            expect(response.statusCode).to.equal(404);
                            expect(body).to.equal('País não encontrado');
                            done();
                        });
                    });
                });
                done();
            });
        });
        it('Retorna status 404 - País não encontrado', function(done) {
            request.get(`${url}/paises/teste404`, function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                expect(body).to.equal('País não encontrado');
                done();
            });
        });
    });
    describe('Inserção de país - POST /paises/', function() {
        it('Retorna objeto e status 200', function(done) {
            request.post({ url: `${url}/paises/`, body: pais, json: true }, function(error, response, body) {
                paisRetornado = body;
                let _body = {};
                try {
                    _body = JSON.parse(body);
                }
                catch(e) {
                    _body = body;
                }
                expect(response.statusCode).to.equal(200);
                expect(_body).to.have.property('name');
                expect(_body).to.have.property('alpha3Code');
                expect(_body).to.have.property('population');
                if (_body.should.have.property('languages')) expect(_body.languages).to.have.lengthOf.at.most(1);
                if (_body.should.have.property('currencies')) expect(_body.languages).to.have.lengthOf.at.most(1);
                expect(_body.name).to.equal('Brasil');
                expect(_body.alpha3Code).to.equal('BRA');
                expect(_body.population).to.equal(206135893);
                
                describe('Remoção de país - DELETE /paises/:nome', function() {
                    it('Retorna objeto e status 200', function(done) {
                        request.delete(`${url}/paises/Brasil`, function(error, response, body) {
                            let _body = {};
                            try {
                                _body = JSON.parse(body);
                            }
                            catch(e) {
                                _body = body;
                            }
                            expect(response.statusCode).to.equal(200);
                            expect(_body).to.have.property('name');
                            expect(_body).to.have.property('alpha3Code');
                            expect(_body).to.have.property('population');
                            if (_body.should.have.property('languages')) expect(_body.languages).to.have.lengthOf.at.most(1);
                            if (_body.should.have.property('currencies')) expect(_body.languages).to.have.lengthOf.at.most(1);
                            expect(_body.name).to.equal('Brasil');
                            expect(_body.alpha3Code).to.equal('BRA');
                            expect(_body.population).to.equal(206135893);
                            
                            done();
                        });
                    });
                    it('Retorna status 404 - País não encontrado', function(done) {
                        request.delete(`${url}/paises/teste404`, function(error, response, body) {
                            expect(response.statusCode).to.equal(404);
                            expect(body).to.equal('País não encontrado');
                            done();
                        });
                    });
                });
                done();
            });
        });
        it('Retorna status 500 - objeto não respeita modelo', function(done) {
            request.post({ url: `${url}/paises/`, body: paisIncompleto, json: true }, function(error, response) {
                expect(response.statusCode).to.equal(500);
                expect(error);
                done();
            });
        });
    });
});