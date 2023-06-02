/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const {nanoid} = require('nanoid');
const books = require('./books');


// menyimpan buku
const AddBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };


  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (Number(readPage) > Number(pageCount)) {
    const response = h.response({
      status: 'fail',
      message:
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };
  books.push(newBook);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};


// mendapatkan semua buku
const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let bookFiltered = books;

  if (name) {
    bookFiltered = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    bookFiltered = books.filter((book) => Number(book.reading) === Number(reading));
  }

  if (finished) {
    bookFiltered = books.filter((book) => Number(book.finished) === Number(finished));
  }

  const response = h.response({
    status: 'success',
    data: {
      books: bookFiltered.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// mendapatkan buku berdasarkan id
const getBookByIdHandler = (request, h) => {
  const {id} = request.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// menghapus buku berdasarkan id
const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// mengubah buku dengan id
const updateBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updateAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
    };

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } else if (Number(readPage) > Number(pageCount)) {
      const response = h.response({
        status: 'fail',
        message: `Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount`,
      });
      response.code(400);
      return response;
    } else if (index !== -1) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
  }
  const response = h.response({
    status: 'fail',
    message: `Gagal memperbarui buku. Id tidak ditemukan`,
  });
  response.code(404);
  return response;
};


module.exports = {
  AddBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  deleteBookByIdHandler,
  updateBookByIdHandler,
};
