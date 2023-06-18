export default class UserInfo {
    constructor({ nameProfileSelector, jobProfileSelector, avatarProfileSelector }) {
        this._userName = document.querySelector(nameProfileSelector);
        this._userJob = document.querySelector(jobProfileSelector);
        this._avatar = document.querySelector(avatarProfileSelector);
        this.getCurrentUserId = this.getCurrentUserId.bind(this);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userJob.textContent,
            avatar: this._avatar.src,
        };
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._avatar.src = data.avatar;
    }

    setCurrentUserId(id) {
        this._currentUserId = id
    }

    getCurrentUserId() {
        return this._currentUserId;
    }
}