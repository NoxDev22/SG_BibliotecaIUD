const btnSearch = document.querySelector(".form__cnBtn");
const selectCategory = document.querySelector(".form__selectCategory");

import { getBooks } from "../repository/fetch.js";
import { booksState } from "../state/bookState.js";
import { getPaginationState } from "../state/paginationState.js";
import { renderBooks } from "./render.js";
import { renderPagination } from "./render.js";

const { resetPagination } = getPaginationState();

export async function searchBooks(value) {
  const VALUE = document.querySelector(".form__selectCategory").value;
  let books = booksState([]).listBooks;
  if (value === "" || VALUE === "") {
    let newBooks = await getBooks();
    books = await newBooks.libros;
  }
  const RESULT_BOOKS = books.filter((book) => {
    const matchBook =
      !value || normalize(book.titulo).includes(normalize(value));
    return matchBook;
  });
  const filteredBooks = filterBooks(VALUE, RESULT_BOOKS);
  booksState(filteredBooks);
  resetPagination();
  renderPagination();
  renderBooks();
}

export function filterBooks(category, RESULTS_BOOKS) {
  const filteredResults = RESULTS_BOOKS.filter((book) => {
    const matchCategory =
      !category || normalize(book.Categoria) === normalize(category);
    return matchCategory;
  });

  return filteredResults;
}

export function suscribeActionSearch() {
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    const inputSearch = document.querySelector(".form_catInput").value;
    searchBooks(inputSearch);
  });

  selectCategory.addEventListener("change", () => {
    searchBooks("");
  });
}

//Normalizar texto
export function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
