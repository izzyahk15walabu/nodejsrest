/* eslint-disable no-param-reassign */
const express = require('express');
const bookcontrollers = require('../controllers/bookcontrolers');

function Router(BOOK) {
  const bookrouter = express.Router();
  const controller = bookcontrollers(BOOK);
  bookrouter
    .route('/book')
    .post(controller.post)

    .get(controller.get);

  // eslint-disable-next-line max-len
  // tis  below meddle ware enables us to alow to query the data base only once so that we can use it to edit the book or just return single book
  // by appending the fetched book from database to req
  bookrouter.use('/book/:bookid', (req, res, next) => {
    BOOK.findById(req.params.bookid, (err, book) => {
      if (err) {
        return res.json(err);
      }

      if (book) {
        req.book = book;

        return next();
      }
      return res.send(404);
    });
  });

  bookrouter
    .route('/book/:bookid')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.save();

      return res.json(book);
    })
    .patch((req, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(`${err}hello `);
        }

        return res.sendStatus(204);
      });
    });

  return bookrouter;
}
module.exports = Router;
