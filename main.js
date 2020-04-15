const app = new Vue({
    el: '#app',
    data: {
        title: 'Vue Random Gallery',
        numberOfPhotos: 8,
        photos: [],
        listOfPhotos: []
    },

    created() {
        for (let index = 0; index < this.numberOfPhotos; index++) {
            this.photos.push({ id: index, url: '', alt: '' });
        }

        this.getNewListOfPhotos();
    },

    methods: {
        getNewListOfPhotos() {
            fetch('https://picsum.photos/v2/list?limit=' + this.numberOfPhotos + '&page=' + ((Math.round(Math.random() * 123)) + 1))
            .then(response => response.json())
            .then(photos => {
                this.photos.forEach(photo => {
                    photo.url = 'https://picsum.photos/id/' + photos[photo.id].id + '/200/200';
                    photo.title = photos[photo.id].author;
                });
            });
        }
    }
});