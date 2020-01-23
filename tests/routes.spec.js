const chai = require('chai');
const chaiHttp = require('chai-http');
const texts = require('../resources/texts.json');
const app = require('../index');

const { expect } = chai;


chai.use(chaiHttp);

describe('Game-routes', () => {
  describe('/GET at start', () => {
    it('should start the game, and return 200 and corresponding message', (done) => {
      chai.request(app)
        .get('/api/start')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.oneOf([texts.playerStarts, texts.computerStarts]);
          done();
        });
    });
  });

  describe('/POST at do-move', () => {
    it('should execute move and return 200 and corresponding message', (done) => {
      chai.request(app)
        .post('/api/do-move')
        .send({
          move: {
            row: 1,
            column: 1,
          },
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.updatedBoard[1][1]).to.equal(1);
          expect(res.body.message).to.equal(texts.yourTurn);
          done();
        });
    });
  });
  describe('/GET at status', () => {
    it('should get status of current game and return 200', (done) => {
      chai.request(app)
        .get('/api/status')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.board[1][1]).to.equal(1);
          done();
        });
    });
  });
  describe('/GET at reset', () => {
    it('should reset the status of current game and return 200', (done) => {
      chai.request(app)
        .get('/api/reset')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.oneOf([texts.playerStarts, texts.computerStarts]);
          done();
        });
    });
  });
});
