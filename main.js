const app = new Vue({
    el: '#app',
    data: {
        title: 'Vue Random Gallery',
        numberOfPhotos: 4,
        photos: []
    },

    created() {
        
        this.photos.push({ url: './photos/photo01.jpg', alt: 'Photo by Alan Quirvan on Unsplash' });
        this.photos.push({ url: './photos/photo02.jpg', alt: 'Photo by roya ann miller on Unsplash' });
        this.photos.push({ url: './photos/photo03.jpg', alt: 'Photo by v2osk on Unsplash' });
        this.photos.push({ url: './photos/photo04.jpg', alt: 'Photo by LOGAN WEAVER on Unsplash' });
        this.photos.push({ url: './photos/photo05.jpg', alt: 'Photo by Jonathan Cooper on Unsplash' });
        this.photos.push({ url: './photos/photo06.jpg', alt: 'Photo by Annie Spratt on Unsplash' });
        this.photos.push({ url: './photos/photo07.jpg', alt: 'Photo by Inés Castellano on Unsplash' });
        this.photos.push({ url: './photos/photo08.jpg', alt: 'Photo by Imraumanzug on Unsplash' });

        // for (let index = 1; index <= this.numberOfPhotos; index++) {
        //     this.photos.push({ url: 'https://picsum.photos/200/200?random=' + index });
        // }
    },

    methods: {
        atualizar() {
            location.reload();
        }
    }
});