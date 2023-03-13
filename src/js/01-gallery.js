import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const makeGallery = image => {
  const { preview, original, description } = image;
  return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
};

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map(makeGallery).join('');

galleryContainer.innerHTML = galleryMarkup;
galleryContainer.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="1400" height="900">`,
    {
      onShow: instance => {
        window.addEventListener('keydown', handleKeyPress);
      },
      onClose: instance => {
        window.removeEventListener('keydown', handleKeyPress);
      },
    }
  );
  instance.show();

  function handleKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

console.log(galleryItems);
