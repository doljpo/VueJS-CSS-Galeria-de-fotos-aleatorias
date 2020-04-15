const app = new Vue({
    el: '#app',
    data: {
        title: 'Vue Random Gallery',
        numberOfPhotos: 6,
        photos: [],
        listOfPhotos: []
    },

    created() {
        for (let index = 0; index < this.numberOfPhotos; index++) {
            this.photos.push({ id: index });
        }

        this.getNewListOfPhotos();
    },

    methods: {
        getNewListOfPhotos() {
            // fetch('https://picsum.photos/v2/list?limit=' + this.numberOfPhotos + '&page=' + ((Math.round(Math.random() * 123)) + 1))
            // .then(response => response.json())
            // .then(photos => {
            //     this.photos.forEach(photo => {
            //         photo.src = 'https://picsum.photos/id/' + photos[photo.id].id + '/350/250';
            //         photo.author = photos[photo.id].author;
            //         photo.unsplashUrl = photos[photo.id].url;
            //     });
            // });

            this.photos.forEach(photo => {
                photo.src = './photo.jpg';
                photo.author = 'Fulano de Tal';
                photo.unsplashUrl = 'https://unsplash.com/photos/nDqA4d5NL0k';
            });            
        }
    }
});