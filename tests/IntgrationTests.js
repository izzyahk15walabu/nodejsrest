require('should');

const mongoose = require('mongoose');
//const BOOK= mongoose.model('BOOK');

const requist = require('supertest');
const app = require('../app');

const agent = requist.agent(app);

describe(' book test ', () => {
  it(' intgrration test for  id', (done) => {
    const bookpost = {
      title: 'malik ambar tale',
      author: 'gelan',
      genre: 'history',
    };

    agent
      .post('/api/book')
      .send(bookpost)
      .expect(200)
      .end((err, result) => {
        console.log (result);
        result.body.read.should.not.equal('false');
         result.body.should.have.property('_id');
         done();

      });
  });
});
