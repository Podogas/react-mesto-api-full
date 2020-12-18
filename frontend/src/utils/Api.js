class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }
  consoleError(err, message) {
    console.error(`${message} ${err}`);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(res.status));
    }
  }
  /*
метод для получения массива всех карточек с сервера
 */
  getInitialCards() {
    return fetch(` ${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then(this._checkResponse);
  }
  /*
метод для получения информации о пользователе с сервера
 */
  getUserInfo() {
    return fetch(` ${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }
  getPageData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  patchUserInfo(dataToPatch) {
    return fetch(` ${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: dataToPatch.name,
        about: dataToPatch.about,
      }),
    }).then((res) => this._checkResponse(res));
  }
  postNewCard(dataToPost) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: dataToPost.name,
        link: dataToPost.link,
      }),
    }).then((res) => this._checkResponse(res));
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }
  like(cardId, method) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: method,
    }).then((res) => this._checkResponse(res));
  }
  patchAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: url }),
    }).then((res) => this._checkResponse(res));
  }
}

const mestoApi = new Api({
  baseUrl: "https://https://api.podogas.students.nomoreparties.space",
  headers: {
    "Content-Type": "application/json",
  },
});
export default mestoApi;
