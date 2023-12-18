const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/inc/server');
const { expect } = chai;

chai.use(chaiHttp);

describe('User Controller', () => {
    describe('POST /signIn', () => {
        it('devrait retourner un token d\'authentification après une connexion réussie', (done) => {
            chai.request(app)
                .post('/signIn')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('devrait renvoyer une erreur si les informations d\'identification sont incorrectes', (done) => {
            chai.request(app)
                .post('/api/user/signIn')
                .send({
                    email: 'utilisateurinexistant@example.com',
                    password: 'motdepasseincorrect'
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal('Identifiants incorrects');
                    done();
                });
        });
    });
});