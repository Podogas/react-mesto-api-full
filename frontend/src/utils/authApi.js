export const BASE_URL = "https://api.podogas.students.nomoreparties.space";

// получение токена
export const getToken = (token) => 

  fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    })
    .then((data) => data);
  
// регистрация
export const signUp = (password, email) =>
  fetch(`${BASE_URL}/signup`, {
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
    return res.json();
  });

// авторизация
export const signIn = (password, email) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("Не передано одно из полей");
      } else if (res.status === 401) {
        throw new Error("Пользователь с таким email не найден");
      }
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data.token;
      }
    });
