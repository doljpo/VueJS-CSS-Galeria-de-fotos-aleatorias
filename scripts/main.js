const typeOfAction = Object.freeze({
    PUSH: 'PUSH',
    UPDATE: 'UPDATE'
});

const app = new Vue({
    el: '#app',
    data: {
        actions: typeOfAction,
        title: 'Vue Random Gallery',
        numberOfPhotos: 6,
        photos: []
    },

    created() {
        this.requestNewPhotos(typeOfAction.PUSH);
    },

    methods: {
        getNewListOfPhotos() {
            this.requestNewPhotos(typeOfAction.UPDATE);
        },

        requestNewPhotos(action) {
            fetch('https://picsum.photos/v2/list?limit=' + this.numberOfPhotos + '&page=' + ((Math.round(Math.random() * 123)) + 1))
                .then(response => response.json())
                .then(result => {
                    if (action == typeOfAction.PUSH) {
                        this.pushNewPhotos(result);
                    }
                    else {
                        for (let index = 0; index < this.numberOfPhotos; index++) {
                            this.updatePhoto(index, result[index]);
                        }
                    }
                });
        },

        pushNewPhotos(result) {
            for (let index = 0; index < this.numberOfPhotos; index++) {
                this.photos.push({
                    href: '#' + index,
                    id: index,
                    link: 'https://picsum.photos/id/' + result[index].id + '/350/250',
                    author: result[index].author,
                    unsplashUrl: result[index].url,
                    download_url: result[index].download_url,
                    isFavorite: false
                });
            }
        },

        updatePhoto(index, newPhoto) {            
            this.photos[index].link = 'https://picsum.photos/id/' + newPhoto.id + '/350/250';
            this.photos[index].author = newPhoto.author;
            this.photos[index].unsplashUrl = newPhoto.url;
            this.photos[index].download_url = newPhoto.download_url;            
        },

        favoritePhoto(photo) {
            this.photos[photo.id].isFavorite = !photo.isFavorite;
            console.log(this.photos[photo.id].id + ' agora eh favorita? = ' + this.photos[photo.id].isFavorite);            
        },

        downloadPhoto(photo) {
            fetch(photo.download_url)
                .then((response) => response.blob())
                .then((blob) => {
                    saveAs(blob, 'Photo by ' + photo.author + '.jpg');
                });
        },

        showEnlargedPhoto(href) {
            window.location = href;
        },

        showMsg(msg) {
            alert(msg);
        }
    }
});