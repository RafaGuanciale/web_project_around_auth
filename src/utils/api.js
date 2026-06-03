class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
  }
  async getUserInfo() {
    const res = await fetch(`${this._url}users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }
  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }
  updateUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleResponse(res));
  }
  createNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleResponse(res));
  }
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: isLiked? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  updateProfilePicture(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  url: "https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    authorization: "c2d6b4db-3556-476f-a62b-f40c99c1f294",
    "Content-Type": "application/json",
  },
});

export default api;
