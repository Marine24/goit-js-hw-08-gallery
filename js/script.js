import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");
const modal = document.querySelector(".lightbox");

//-----------------добавление изображений-------------------//
const galleryItem = galleryItems.reduce((allItems, item) => {
  allItems += `<li class="gallery__item">
<a
  class="gallery__link"
  href="${item.original}"
>
  <img
    class="gallery__image"
    src="${item.preview}"
    data-source="${item.original}"
    alt="${item.description}"
  />
  <span class="gallery__icon">
    <i class="material-icons">zoom_out_map</i>
  </span>
</a>
</li>
`;
  return allItems;
}, "");
galleryList.insertAdjacentHTML("afterbegin", `${galleryItem}`);
//--------------------------------------------------------------//

//-----------------открытие модального окна--------------------//
galleryList.addEventListener("click", e => {
  if (e.target === e.currentTarget) return;
  event.preventDefault();

  const modalImage = document.querySelector(".lightbox___image");
  const imageLink = e.target.getAttribute("data-source");
  const imageText = e.target.getAttribute("alt");
  modalImage.setAttribute("src", imageLink);
  modalImage.setAttribute("alt", imageText);
  modal.classList.add("is-open");
});
//--------------------------------------------------------------//

//-----------функция закрытия модального окна-------------------//
function closeModal() {
  modal.classList.remove("is-open");
  modalImage.setAttribute("src", "");
}
//--------------------------------------------------------------//

//-----------------закрытие по клику на div.overlay-------------//
const modalOverlayClose = document.querySelector(".lightbox__content");
modalOverlayClose.addEventListener("click", e => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
});

//----закрытие по клику на кнопку button[data-action="close-modal"]----//
const modalButtonClose = document.querySelector(
  '[data-action="close-lightbox"]'
);
modalButtonClose.addEventListener("click", () => {
  closeModal();
});

//-------------------закрытие по ESC-----------------//
galleryList.addEventListener("keyup", e => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
