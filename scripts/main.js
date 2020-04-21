const typeOfAction = Object.freeze({
    PUSH: 'PUSH',
    UPDATE: 'UPDATE'
});

const app = new Vue({
    el: '#app',
    data: {
        actions: typeOfAction,
        title: 'Galeria Aleatória',
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
            var doDownload = false;

            this.photos.forEach(photo => {
                if (photo.isFavorite) {
                    doDownload = true;
                }
            });

            if (doDownload) {
                this.photos.forEach(photo => {
                    if (photo.isFavorite)
                        this.downloadPhoto(photo);
                });
            } else {
                alert('Nenhuma foto marcada como favorita.');
            }
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
        },

        switchTheme() {
            var rgbLeft = this.getRandomColor() + ' 15%';
            var rgbCenter = this.getRandomColor() + ' 35%';
            var rgbRight = this.getRandomColor() + ' 50%';
            var degree = ((Math.round(Math.random() * 359)) + 1);
            
            var linearGradient = 'linear-gradient(' + degree + 'deg, ' + rgbLeft + ', ' + rgbCenter + ', ' + rgbRight + ')';

            if (document.getElementById('backgroundOne').style.opacity == 1) {
                document.getElementById('backgroundTwo').style.background = linearGradient;
                document.getElementById('backgroundTwo').style.opacity = 1;
                document.getElementById('backgroundOne').style.opacity = 0;
            } else {
                document.getElementById('backgroundOne').style.background = linearGradient;
                document.getElementById('backgroundOne').style.opacity = 1;
                document.getElementById('backgroundTwo').style.opacity = 0;
            }
        },

        getRandomColor() {
            var r = ((Math.round(Math.random() * 254)) + 1);
            var g = ((Math.round(Math.random() * 254)) + 1);
            var b = ((Math.round(Math.random() * 254)) + 1);

            return 'rgba(' + r + ',' + g + ',' + b + ',1) ';
        }
    }
});