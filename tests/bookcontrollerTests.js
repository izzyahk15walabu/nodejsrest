const should = require('should');
const sinon = require('sinon');
const bookcontroller = require('../controllers/bookcontrolers');

describe('book controler tests : ', () => {
  describe('post', () => {
    it(' it should not allow empty titiles ob post', () => {
      const BOOK = function (book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: 'jon',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
      const control = bookcontroller(BOOK);
      control.post(req, res);

      res.status.calledWith(400).should.equal(true, `bad status${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
