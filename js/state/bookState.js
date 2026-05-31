let listBooks = [];
const viewBooks = 3;

export function booksState(books) {
  let lengthBooks = listBooks.length;

  if (books.length > 0) {
    listBooks = books;
  }
  return {
    listBooks,
    lengthBooks,
    viewBooks,
  };
}

export function getViewBooks() {
  return viewBooks;
}
