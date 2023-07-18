export class UserInfo {
  constructor(selectors) {
    (this._name = document.querySelector(selectors.name)),
      (this._job = document.querySelector(selectors.job));
  }

  getUserInfo() {
    this._data = {
      name: this._name.textContent,
      job: this._job.textContent
    };

    return this._data;
  }

  setUserInfo(data) {
    (this._name.textContent = data.name), (this._job.textContent = data.job);
  }
}
