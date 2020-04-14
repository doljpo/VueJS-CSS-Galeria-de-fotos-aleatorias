const app = new Vue({
    el: '#app',
    data: {
        title: 'Vue Random Gallery',
        numberOfPhotos: 4,
        photos: []
    },

    created() {
        for (let index = 1; index <= this.numberOfPhotos; index++) {
            this.photos.push({ url: 'https://picsum.photos/200/200?random=' + index });
        }
    },

    methods: {
        atualizar() {
            location.reload();
        }
    }
});