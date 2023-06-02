/* eslint-disable linebreak-style */
const {
  AddBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  deleteBookByIdHandler,
  updateBookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: AddBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler,
  },
];

module.exports = routes;
