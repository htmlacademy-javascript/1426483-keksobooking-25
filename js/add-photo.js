import { FILE_TYPES } from './data.js';
const avatarElement = document.querySelector('[name="avatar"]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoElement = document.querySelector('[name="images"]');
const photoPreview = document.querySelector('.ad-form__photo');

const setPhotoChange = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {

    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      if (preview.tagName === 'IMG') {
        preview.src = URL.createObjectURL(file);
      } else {
        preview.innerHTML = '';
        const imageElementHTML = document.createElement('img');
        imageElementHTML.setAttribute('src', URL.createObjectURL(file));
        imageElementHTML.setAttribute('alt', 'Фотография жилья');
        imageElementHTML.classList.add(preview.classList);

        preview.appendChild(imageElementHTML);
      }
    }
  });
};

setPhotoChange(avatarElement, avatarPreview);
setPhotoChange(photoElement, photoPreview);

const resetPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

export { resetPhoto };
