<template>
    <v-container v-if="shelf">
        <h1>{{ shelf.name }}</h1>
        <p>{{ shelf.description }}</p>

        <v-row>
            <v-col v-for="b in shelfBooks" :key="b.isbn" cols="12" sm="6" md="4">
                <v-card @click="goBook(b.isbn)" class="cursor-pointer">
                    <v-img :src="b.cover.thumbnail" height="200" cover />
                    <v-card-title>{{ b.title }}</v-card-title>
                    <v-card-subtitle>{{ b.author }}</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else>
        <v-alert type="error">Shelf not found</v-alert>
    </v-container>
</template>

<script>
import shelvesData from '@/data/shelf.json'


export default {
    name: 'ShelfPage',

    data() {
        return {
            shelf: null,
            shelfBooks: []
        }
    },

    created() {
        const id = this.$route.params.id

        this.shelf = shelvesData.find(s => s.id === id)

        if (this.shelf) {
            this.shelfBooks = books.filter(b =>
                this.shelf.books.includes(b.isbn)
            )
        }
    },

    methods: {
        goBook(isbn) {
            this.$router.push(`/book/${isbn}`)
        }
    }
}
</script>