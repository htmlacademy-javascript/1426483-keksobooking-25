import { FILE_TYPES } from './const.js';
const avatarElement = document.querySelector('[name="avatar"]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoElement = document.querySelector('[name="images"]');
const photoPreviewElement = document.querySelector('.ad-form__photo');

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

setPhotoChange(avatarElement, avatarPreviewElement);
setPhotoChange(photoElement, photoPreviewElement);

const resetPhoto = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  photoPreviewElement.innerHTML = '';
};

export { resetPhoto };
