class Api {
    constructor(serverAddress, authorizationToken) {
        this.server = serverAddress;
        this.token = authorizationToken;
    }

    getUserInfoFromServer() { // получение данных профиля
        return fetch(`${this.server}/users/me`, {
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't get user info from server: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });

    }

    getInitialCards() { // получение изначальных карточек
        return fetch(`${this.server}/cards`, {
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't get initial cards: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }

    patchUserInfo(newUserName, newUserAbout) { // обновление данных профиля на сервере
        return fetch(`${this.server}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${newUserName}`,
                about: `${newUserAbout}`,
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't update user info: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }

    createCard(cardName, cardLink) { // добавление новых карточек на сервер
        return fetch(`${this.server}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${cardName}`,
                link: `${cardLink}`,
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't create card: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }

    patchAvatar(newAvatar) { // обновление аватара
        return fetch(`${this.server}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${newAvatar}`
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't update avatar: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }

    deleteCard(id) {  // удаление карточки
        return fetch(`${this.server}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't remove this card: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }

    likeCard(id) {  // лайк карточки
        return fetch(`${this.server}/cards/like/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't like card: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }

    removeLike(id) {  // удаление лайка карточки
        return fetch(`${this.server}/cards/like/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.error("Couldn't remove like from this card: ", err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }
}

