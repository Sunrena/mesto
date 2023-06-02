export default class UserInfo {
    constructor({ nameProfile, jobProfile }) {
        this._userName = document.querySelector(nameProfile);
        this._userJob = document.querySelector(jobProfile);
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