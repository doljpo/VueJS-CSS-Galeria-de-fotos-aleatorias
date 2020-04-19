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
            console.log('trying to get new photos...');
            
            this.requestNewPhotos(typeOfAction.UPDATE);
        },

        requestNewPhotos(action) {
            console.log('getting new photos...');
            
            fetch('https://picsum.photos/v2/list?limit=' + this.numberOfPhotos + '&page=' + ((Math.round(Math.random() * 123)) + 1))
                .then(response => response.json())
                .then(result => {
                    if (action == typeOfAction.PUSH) {
                        this.pushNewPhotos(result);
                    }
                    else {
                        for (let index = 0; index < this.numberOfPhotos; index++) {
                            this.photos[index].link = 'https://picsum.photos/id/' + result[index].id + '/350/250';
                            this.photos[index].author = result[index].author;
                            this.photos[index].unsplashUrl = result[index].url;
                            this.photos[index].download_url = result[index].download_url;
                        }
                    }
                });


            if (action == action.PUSH) {

            }
        },

        pushNewPhotos(result) {
            for (let index = 0; index < this.numberOfPhotos; index++) {
                this.photos.push({
                    href: '#' + index,
                    id: index,
                    link: 'https://picsum.photos/id/' + result[index].id + '/350/250',
                    unsplashUrl: result[index].url,
                    download_url: result[index].download_url
                });

                // this.updatePhoto(index, result[index]);
            }
        },

        // updatePhoto(index, photo) {
            
        //     this.photos[index].link = 'https://picsum.photos/id/' + photo.id + '/350/250';
        //     this.photos[index].author = photo.author;
        //     this.photos[index].unsplashUrl = photo.url;
        //     this.photos[index].download_url = photo.download_url;
        //     console.log(this.photos[index].link);
        // },

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