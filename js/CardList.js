export class CardList {
  constructor(container, createCard, api, userInfo) {
    this.container = container;
    this.createCard = createCard;
    this.api = api;
    this.userInfo = userInfo;
  }

  addCard(data) {
    const card = this.createCard(data);
    this.container.appendChild(card.create());
  }

  render() {
    this.api.getInitialCards()
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].owner._id === this.userInfo.userId) {
            result[i].cardId = result[i]._id;
            // Можно без перебора в одну строку практически
            // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
            for (let x = 0; x < result[i].likes.length; x++) {
              if (result[i].likes[x]._id === this.userInfo.userId) {
                result[i].liked = '+';
              }
            }
            cardList.addCard(result[i]);
          }
        }
      })
      .catch(err => {
        alert("Couldn't get initial cards from server");
      });
  }
}