const NAV_MENU_ICON = document.querySelector(".header__menuIcon");
const NAV_MOBILE = document.querySelector(".header__nav");

NAV_MENU_ICON.addEventListener("click", () => {
  NAV_MENU_ICON.classList.toggle("header__menuIcon--close");
  NAV_MOBILE.classList.toggle("header__nav--active");
});

window.addEventListener("scroll", () => {
  if (NAV_MOBILE.classList.contains("header__nav--active")) {
    NAV_MOBILE.classList.remove("header__nav--active");
    NAV_MENU_ICON.classList.remove("header__menuIcon--close");
  }
});

//===========================================================
//header__navLi--active
const navLi = document.querySelectorAll(".header__navLi");

let path = window.location.pathname;
let pathName = path.slice(1, -5);

if (pathName === "index") {
  pathName = "principal";
}

navLi.forEach((li) => {
  let text = li.firstElementChild.textContent.toLowerCase();
  if (text === pathName) {
    li.classList.add("header__navLi--active");
  } else {
    li.classList.remove("header__navLi--active");
  }
});
