export class UserInfo {
    constructor(avatar, nameContainer, aboutContainer, api) {
        this.nameContainer = nameContainer;
        this.aboutContainer = aboutContainer;
        this.avatar = avatar;
        this.userId = '';
        api.getUserInfoFromServer()
            .then(data => {
                this.nameContainer.textContent = data.name;
                this.aboutContainer.textContent = data.about;
                this.avatar.style.backgroundImage = `url(${data.avatar})`;
                this.userId = data._id;
            })
            .catch(err => {
                alert("Couldn't get userInfo from server");
            });
    }

    setUserInfo(name, about) {
        name.value = this.nameContainer.textContent;
        about.value = this.aboutContainer.textContent;
    }

    updateUserInfo(name, about) {
        this.nameContainer.textContent = name;
        this.aboutContainer.textContent = about;
    }

    updateAvatar(link) {
        this.avatar.style.backgroundImage = `url(${link})`;
    }
}