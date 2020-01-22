const chai = require('chai');
const chaiHttp = require('chai-http');
const { checkForWinner } = require('../game/gameLogic');
const { startGame, executeMove, reset } = require('../routes/gameRoutes');
const app = require('../index');


chai.use(chaiHttp);

/* describe('Game-routes', () => {
  describe('/GET at start', () => {
    it('should start the game, and return text to telling so', (done) => {
      chai.request(app)
        .get('/start')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          console.log(res);
          expect(res).to.have.status(200);
        });
    });
  });
});
 */