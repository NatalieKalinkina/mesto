export class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._about = document.querySelector(selectors.about);
    this._avatar = document.querySelector(selectors.avatar)
  }

  getUserInfo() {
    this._data = {
      name: this._name.textContent,
      about: this._about.textContent
    };

    return this._data;
  }

  setUserInfo(data) {
    (this._name.textContent = data.name), (this._about.textContent = data.about);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}
