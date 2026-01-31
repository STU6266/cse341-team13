const express = require('express');
const routes = express.Router();

const booksController = require('../controllers/books');

routes.get('/', booksController.getAllBooks);
routes.get('/:id', booksController.getBookById);
routes.post('/', booksController.createBook);
routes.put('/:id', booksController.updateBook);
routes.delete('/:id', booksController.deleteBook);

module.exports = routes;