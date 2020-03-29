import '../index.css';
import '../images/logo.svg';
import '../images/close.svg';
import { serverUrl } from './config.js';
import { Api } from './Api.js';
import { Card } from './Card.js';
import { CardList } from './CardList.js';
import { FormValidator } from './FormValidator.js';
import { Popup } from './Popup.js';
import { UserInfo } from './UserInfo.js';

const placesList = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const popupAdd = document.querySelector('.popup.popup_add');
const popupEdit = document.querySelector('.popup.popup_edit');
const popupPicture = document.querySelector('.popup.popup__picture');
const popupAvatar = document.querySelector('.popup.popup__avatar');
const picture = document.querySelector('.picture');
const formAdd = document.forms.new; //new - name формы
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const userPhoto = document.querySelector('.user-info__photo');
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');

export const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
}

const authorizationToken = 'a4338a35-a4f2-46d7-8cab-e17ed8973606';
export const api = new Api(serverUrl, authorizationToken);
const createCard = (args) => new Card(args);
const userInfo = new UserInfo(userPhoto, userName, userAbout, api);
export const cardList = new CardList(placesList, createCard, api, userInfo);

formAdd.addEventListener('submit', function (event) {
  event.preventDefault();
  formAdd.querySelector('.popup__button').style.fontSize = '18px';
  formAdd.querySelector('.popup__button').textContent = 'Загрузка...';
  const data = {
    name: formAdd.elements.name.value,
    link: formAdd.elements.link.value,
  };
  api.createCard(data.name, data.link)
    .then(res => {
      cardList.addCard(data);
      formAdd.querySelector('.popup__button').style.fontSize = '36px';
      formAdd.querySelector('.popup__button').textContent = '+';
      const popup = new Popup(popupAdd);
      popup.close();
    })
    .catch(err => {
      alert("Couldn't create card");
    });
});

addButton.addEventListener('click', function () {
  formAdd.reset();
  const popup = new Popup(popupAdd);
  popup.open();
  const formValidator = new FormValidator()
  formValidator.setEventListeners(popupAdd);
});

document.addEventListener('click', function () {
  const popup = new Popup(popupPicture);
  if (event.target.classList.contains('place-card__image')) {
    picture.src = event.target.style.backgroundImage.slice(5, -2);
    popup.open();
  }
});

formEdit.addEventListener('submit', function (event) { // сохранение результата изменения данных формы
  event.preventDefault();
  formEdit.querySelector('.popup__button_save').textContent = 'Загрузка...';
  const name = event.target.querySelector('.popup__input_type_name2').value;
  const about = event.target.querySelector('.popup__input_type_about').value;
  api.patchUserInfo(name, about)
    .then(res => {
      formEdit.querySelector('.popup__button_save').textContent = 'Сохранить';
      userInfo.updateUserInfo(name, about);
      const popup = new Popup(popupEdit);
      popup.close();
    })
    .catch(err => {
      alert("Couldn't update user info");
    });
});

editButton.addEventListener('click', function (event) {  // открытие формы edit
  event.preventDefault();
  const name = document.querySelector('.popup__input_type_name2');
  const about = document.querySelector('.popup__input_type_about');
  userInfo.setUserInfo(name, about);
  const popup = new Popup(popupEdit);
  const formValidator = new FormValidator()
  formValidator.setEventListeners(popupEdit);
  popup.open();
});

userPhoto.addEventListener('click', function () { // открытие формы смены аватара
  formAvatar.reset();
  const x = new Popup(popupAvatar);
  x.open();
  const formValidator = new FormValidator()
  formValidator.setEventListeners(popupAvatar);
});

formAvatar.addEventListener('submit', function (event) { // сохранение нового аватара
  event.preventDefault();
  const link = event.target.querySelector('.popup__input_type_avatar').value;
  api.patchAvatar(link)
    .then(res => {
      userInfo.updateAvatar(link);
    })
    .catch(err => {
      alert("Couldn't change avatar");
    });
  const popup = new Popup(popupAvatar);
  popup.close();
});

cardList.render();