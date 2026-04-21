<template>
    <v-container v-if="book">
        <v-row>
            <v-col cols="12" md="4">
                <v-img :src="book.cover.url" height="400" cover />
            </v-col>

            <v-col cols="12" md="8">
                <h1>{{ book.title }}</h1>
                <p><b>Author:</b> {{ book.author }}</p>
                <p><b>Publisher:</b> {{ book.publisher }}</p>
                <p><b>Year:</b> {{ book.publish_year }}</p>
                <p><b>Pages:</b> {{ book.page_count }}</p>

                <p class="mt-4">{{ book.description }}</p>

                <v-chip v-for="k in book.keywords" :key="k" class="ma-1" small>
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

export default {
    name: 'BookPage',

    data() {
        return {
            book: null
        }
    },

    created() {
        const isbn = this.$route.params.isbn
        this.book = booksData.find(b => b.isbn === isbn)
    }
}
</script>