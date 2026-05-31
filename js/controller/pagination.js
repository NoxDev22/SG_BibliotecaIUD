const PaginationNext = document.querySelector(".next");
const PaginationPrev = document.querySelector(".prev");
//========================================================
import { getPaginationState } from "../state/paginationState.js";

//Estado de arreglo de paginación
let paginationLi = [];
const {
  pgConfig,
  handlePrev,
  handleNext,
  handleByValue,
  increasePgCurrent,
  decreasePgCurrent,
} = getPaginationState();

export function changePagination() {
  let lgPagination = document.querySelectorAll(".pagination__li");
  if (lgPagination.length > 0) {
    paginationLi = lgPagination;
  }
  return paginationLi;
}

export function disablePaginationButtons() {
  const { pgCurrent } = pgConfig;

  if (pgCurrent === 1) {
    PaginationPrev.classList.add("prev--inactive");
  } else {
    PaginationPrev.classList.remove("prev--inactive");
  }
  if (pgCurrent === 11) {
    PaginationNext.classList.add("prev--inactive");
  } else {
    PaginationNext.classList.remove("prev--inactive");
  }
}

export function subscribeActionNextPrevPg(renderPagination, renderBooks) {
  PaginationPrev.addEventListener("click", () => {
    decreasePgCurrent();
    handlePrev();
    renderPagination();
    renderBooks();
  });
  PaginationNext.addEventListener("click", () => {
    increasePgCurrent();
    handleNext();
    renderPagination();
    renderBooks();
  });
}

export function suscribeActionByValuePg(renderPagination, renderBooks) {
  paginationLi.forEach((li) => {
    li.addEventListener("click", () => {
      handleByValue(li.textContent - 1);
      renderPagination();
      renderBooks();
    });
  });
}
