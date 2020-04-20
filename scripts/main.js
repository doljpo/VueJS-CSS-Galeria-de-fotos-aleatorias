const typeOfAction = Object.freeze({
    PUSH: 'PUSH',
    UPDATE: 'UPDATE'
});

const app = new Vue({
    el: '#app',
    data: {
        actions: typeOfAction,
        title: 'Random Photos Gallery',
        numberOfPhotos: 6,
        photos: []
    },

    created() {
        this.requestNewPhotos(typeOfAction.PUSH);
    },

    methods: {
        getNewListOfPhotos() {
            var doRequest = false;

            this.photos.forEach(photo => {
                if (!photo.isFavorite) {
                    photo.showLoading = true;
                    doRequest = true;
                }
            });

            if (doRequest) {
                this.requestNewPhotos(typeOfAction.UPDATE);
            } else {
                alert('Todas fotos marcadas como favoritas. Nenhuma será substituída.');
            }
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
                    isFavorite: false,
                    showLoading: false
                });
            }
        },

        updatePhoto(index, newPhoto) {
            if (this.photos[index].isFavorite)
                return;

            this.photos[index].link = 'https://picsum.photos/id/' + newPhoto.id + '/350/250';
            this.photos[index].author = newPhoto.author;
            this.photos[index].unsplashUrl = newPhoto.url;
            this.photos[index].download_url = newPhoto.download_url;
            this.photos[index].showLoading = false;
        },

        favoritePhoto(photo) {
            this.photos[photo.id].isFavorite = !photo.isFavorite;
        },

        saveAllFavorites() {
            this.photos.forEach(photo => {
                if (photo.isFavorite)
                    this.downloadPhoto(photo);
            });
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

        getNewPhoto(photo) {
            if (photo.isFavorite) {
                alert('Foto marcada como favorita não pode ser substituída.');
            } else {
                photo.showLoading = true;

                fetch('https://picsum.photos/v2/list?limit=1&page=' + ((Math.round(Math.random() * 992)) + 1))
                    .then(response => response.json())
                    .then(result => {
                        this.updatePhoto(photo.id, result[0]);
                    });
            }
        }
    }
});