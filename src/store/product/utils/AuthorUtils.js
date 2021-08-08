import { parse } from '@fortawesome/fontawesome-svg-core';

export function searchAuthor(array, authorID) {
  const index = array.findIndex(({ id }) => id === authorID);
  return index;
}

export function searchBook(bookid, authorID, authors) {
  let authorIndex = searchAuthor(authors, parseInt(authorID));
  let books = authors[authorIndex].books;
  let indexBook = null;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === bookid) {
      indexBook = i;
    }
  }
  return indexBook;
}

export function saveAuthors(authors) {
  localStorage.setItem('authors', JSON.stringify(authors));
}

export function retrieveAuthors() {
  let authors = localStorage.getItem('authors');
  authors = JSON.parse(authors);

  return authors;
}
