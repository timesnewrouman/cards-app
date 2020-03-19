class Card {
  constructor(data) {
    this.data = data;
  }

  create() {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.insertAdjacentHTML('beforeend', `
      <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
      </div>`);
    placeCard.setAttribute('cardId', this.data.cardId);
    if (this.data.liked === '+') {
      placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }
    placeCard.querySelector('.place-card__name').textContent = this.data.name;
    placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.data.link})`;
    placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    return placeCard;
  }

  like(event) {
    const likeIcon = event.target;
    const card = event.target.parentElement.parentElement;
    if (likeIcon.classList.contains('place-card__like-icon_liked')) {
      api.removeLike(card.getAttribute('cardId'))
        .then(res => {
          likeIcon.classList.remove('place-card__like-icon_liked');
        })
        .catch(err => {
          alert("Couldn't remove like");
        });
    } else {
      
      api.likeCard(card.getAttribute('cardId'))
      .then(res => {
        likeIcon.classList.add('place-card__like-icon_liked');
      })
      .catch(err => {
        alert("Couldn't like card");
      });;
    }
  }

  remove() {
    const card = event.target.parentElement.parentElement;
    if (window.confirm("Вы дейстивительно хотите удалить эту карточку?")) {
      api.deleteCard(card.getAttribute('cardId'))
        .then(res => {
          card.removeEventListener('click', this.like);
          card.removeEventListener('click', this.remove);
          card.parentElement.removeChild(card);
        })
        .catch(err => {
          alert("Couldn't remove card");
          //return Promise.reject(`Ошибка: ${err.status}`);
        });
    }
  }
}