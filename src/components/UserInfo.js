export default class UserInfo {
    constructor({ nameProfileSelector, jobProfileSelector }) {
        this._userName = document.querySelector(nameProfileSelector);
        this._userJob = document.querySelector(jobProfileSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userJob.textContent,
        };
    }

    setUserInfo({name, about}) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
    }
}