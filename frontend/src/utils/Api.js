

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

    // получение токена
  getToken(token){
  return fetch(`${this._url}/users/me`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log(res);
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }

      return res.json();
    })
    .then((data) => {return data})
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




 
// регистрация
signUp(password, email){
  
  return fetch(`${this._url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("Не передано одно из полей");
      }
      return res.json().then((err) => {
        throw new Error(err.message);
      });
    }
    console.log(res)
    return res;
  });
}
// авторизация
signIn(password, email) {
  console.log(JSON.stringify({ password, email }))
    return fetch(`${this._url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      console.log(res)
      if (res.status === 400) {
        throw new Error("Не передано одно из полей");
      } else if (res.status === 401) {
        throw new Error("Пользователь с таким email не найден");
      }
      return res;
    })
    .then((data) => {
      console.log(data)
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }

        return data;
      
    });
}
















}
/*https://api.podogas.students.nomoreparties.space*/
const mestoApi = new Api({
  baseUrl: "https://api.podogas.students.nomoreparties.space",
  headers: {
    "Content-Type": "application/json",
    "authorization" : `Bearer ${localStorage.getItem('jwt')}`

  },
})
export default mestoApi;
