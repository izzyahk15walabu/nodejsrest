function bookcontroler(BOOK) {
  function post(req, res) {
    const book = new BOOK(req.body);
    // if (!req.body.title) {
    //   res.status(400);
    //   const newLocal = 'Title is required';
    //   return res.send(newLocal);
    // }
    
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    BOOK.find(query, (err, books) => {
      if (err) {
        return res.json(err);
      }
      return res.json(books);
    });
  }

  return { post, get };
}
module.exports = bookcontroler;
