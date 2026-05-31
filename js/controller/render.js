const containerBooks = document.querySelector(".bookCard__container");
const containerPagination = document.querySelector(".pagination__list");

//=================================================
import { booksState } from "../state/bookState.js";
import { getPaginationState } from "../state/paginationState.js";
import {
  changePagination,
  disablePaginationButtons,
  subscribeActionNextPrevPg,
  suscribeActionByValuePg,
} from "./pagination.js";

//=================================================
export function renderPagination() {
  //Obteniendo el estado que contiene la lista de los libros
  let { lengthBooks, viewBooks } = booksState([]);
  //Obteniendo el estado que el pgCurrent
  const { pgConfig } = getPaginationState();
  const { pgCurrent } = pgConfig;
  //Calculando el numero de elementos que tendrá la paginación
  let pgLength = Math.ceil(lengthBooks / viewBooks);
  //Creando el arreglo para renderizar la paginación
  const pagination = Array.from({ length: pgLength }, (_, i) => i + 1);
  //Inhabilitar botones de paginación
  disablePaginationButtons();

  //Renderizar dinámicamente los elementos de la paginación
  containerPagination.innerHTML = pagination
    .map(
      (pgValue) =>
        `<li class='pagination__li ${pgCurrent === pgValue ? "pagination--active" : ""}'>${pgValue}</li>`,
    )
    .join("");
}
//=================================================
export function renderBooks() {
  let { listBooks: books } = booksState([]);
  const { pgConfig } = getPaginationState();
  const { lowerLimit: lower, upperLimit: upper } = pgConfig;
  //Actualizando valores para la paginación
  changePagination();
  suscribeActionByValuePg(renderPagination, renderBooks);
  containerBooks.innerHTML = ``;
  containerBooks.innerHTML += books
    .slice(lower, upper)
    .map(
      (libro) => `
     <div class="swiper-slide bookCard">
                <figure class="bookCard__figure">
                  <img
                    src="${libro.urlImagen}"
                    alt="Imagen de libro fundamentos de algoritmia"
                    class="bookCard__img"
                  />
                </figure>
                <div class="bookCard__bookInfo">
                  <p class="bookCard__categoryText">${libro.Categoria}</p>
                  <div class="bookCard__bookData">
                    <h3 class="bookCard__bookTitle">${libro.titulo}</h3>
                    <p class="bookCard__bookAutor">${libro.Autor}</p>
                  </div>
                  <div class="bookCard__bookData">
                    <div class="bookCard__bookDataState">
                      <p class="bookCard__isbnText">ISBN:</p>
                      <p class="bookCard__isbnNumber">${libro.ISBN}</p>
                    </div>
                    <div class="bookCard__bookDataState">
                      <p class="bookCard__isbnText">Estado:</p>
                      <p class="bookCard__bookState  ${!libro.Estado ? "bookCard__bookStateNotAvailable" : ""}">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          viewBox="0 0 24 24"
                          class="bookCard__iconState"
                        >
                          <path
                            fill="#239700"
                            d="M12 17a5 5 0 1 1 0-10a5 5 0 0 1 0 10Z"
                          />
                        </svg>
                        ${libro.Estado ? "Disponible" : "No Disponible"}
                      </p>
                    </div>
                  </div>
                </div>
                <button class="btn__blue bookCard__btnReserve">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    class="bookCard__iconReserve"
                  >
                    <path
                      fill="#001125"
                      d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"
                    />
                  </svg>
                  Reservar
                </button>
              </div>
      `,
    )
    .join("");
}
//=================================================
subscribeActionNextPrevPg(renderPagination, renderBooks);
