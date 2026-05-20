<template>
    <v-container v-if="book">
        <v-row>
            <v-col cols="12" md="4">





                <v-img :src="getBookCover(book.isbn)" height="400" cover />


                <p v-if="book.isbn" class="mt-2 text-center">
                    <b>ISBN:</b> {{ book.isbn }}
                </p>
            </v-col>

            <v-col cols="12" md="8">
                <h1>{{ book.title }}</h1>
                <h3>{{ book.title_secondary }}</h3>
                <p><b>الكاتب:</b> {{ book.author }}</p>
                <p><b>الناشر:</b> {{ book.publisher }}</p>
                <p><b>سنة النشر:</b> {{ book.publish_year }}</p>
                <p><b>مكان النشر:</b> {{ book.publish_country }}</p>
                <p><b>الطبعة:</b> {{ book.edition }}</p>
                <hr />
                <p><b>الخزانة:</b> {{ book.Cabinet }}</p>
                <p><b>الرف:</b> {{ book.shelf }}</p>
                <hr />
                <p class="mt-4">{{ book.description }}</p>

                <v-chip v-for="k in book.keywords.split('،').map(x => x.trim()).filter(Boolean)" :key="k" class="ma-1"
                    small>
                    {{ k }}
                </v-chip>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else>
        <v-alert type="error">Book not found</v-alert>
    </v-container>
</template>

<script>
import booksData from '@/data/books.json' // your array
const images = import.meta.glob('/src/assets/*.{jpg,jpeg,png}', { eager: true });
export default {
    name: 'BookPage',

    data() {
        return {
            book: null,

        }
    },
    computed: {

    },
    methods: {
        getBookCover(isbn) {
            const targetPath = `/src/assets/${isbn}.jpg`;
            const fallbackPath = '/src/assets/bookcover_cover.png';

            // 2. Check if the file actually exists in our asset map
            if (images[targetPath]) {
                return images[targetPath].default;
            }

            // 3. If it doesn't exist, return the fallback
            return images[fallbackPath]?.default || fallbackPath;
        }
    },

    created() {
        const isbn = this.$route.params.isbn
        this.book = booksData.find(b => b.isbn === isbn)
    }
}
</script>