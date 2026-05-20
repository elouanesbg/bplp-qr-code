<template>
    <v-container v-if="shelfBooks">

        <v-tabs v-model="tab" grow>
            <v-tab v-for="item in shelfBooks" :key="item.shelfNumber" :value="item.shelfNumber">
                الرف: {{ item.shelfNumber }}
            </v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item v-for="item in shelfBooks" :key="item.shelfNumber" :value="item.shelfNumber">
                <v-row class="mt-4">
                    <v-col v-for="book in item.books" :key="book.isbn" cols="6" sm="4" md="3" lg="2">
                        <div class="book-wrapper" @click="goBook(book.isbn)">
                            <v-card class="book-card" elevation="6">
                                <v-img :src="getBookCover(book.isbn)" height="260" cover class="book-cover" />

                                <div class="book-spine"></div>

                                <div class="book-info">
                                    <div class="book-title">
                                        {{ book.title }}
                                    </div>

                                    <div class="book-author">
                                        {{ book.author }}
                                    </div>
                                </div>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-window-item>
        </v-window>

    </v-container>

    <v-container v-if="hasError">
        <v-alert type="error">Shelf not found</v-alert>
    </v-container>
</template>

<script>
import booksData from '@/data/books.json'

const images = import.meta.glob('/src/assets/*.{jpg,jpeg,png}', { eager: true });

export default {
    name: 'ShelfPage',

    data() {
        return {
            shelfBooks: null,
            hasError: false,
            tab: null
        }
    },

    created() {
        const id = this.$route.params.id

        const filteredBooks = booksData.filter(s => s.Cabinet === id)

        if (filteredBooks.length) {

            const shelfStructure = {};

            filteredBooks.forEach(book => {
                const sh = book.shelf;

                if (!shelfStructure[sh]) {
                    shelfStructure[sh] = [];
                }

                shelfStructure[sh].push(book);
            });

            this.shelfBooks = Object.keys(shelfStructure)
                .map(shelfKey => ({
                    shelfNumber: Number(shelfKey),
                    books: shelfStructure[shelfKey]
                }))
                .sort((a, b) => a.shelfNumber - b.shelfNumber);

            this.tab = this.shelfBooks[0].shelfNumber;

        } else {
            this.hasError = true;
        }
    },

    methods: {
        goBook(isbn) {
            this.$router.push(`/book/${isbn}`)
        },

        getBookCover(isbn) {
            const targetPath = `/src/assets/${isbn}.jpg`;
            const fallbackPath = '/src/assets/bookcover_cover.png';

            if (images[targetPath]) {
                return images[targetPath].default;
            }

            return images[fallbackPath]?.default || fallbackPath;
        }
    }
}
</script>
<style scoped>
.book-wrapper {
    display: flex;
    justify-content: center;
    cursor: pointer;
}

.book-card {
    position: relative;
    width: 170px;
    border-radius: 6px !important;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background: #fff;
}

.book-card:hover {
    transform: translateY(-6px) scale(1.02);
}

.book-cover {
    border-bottom: 1px solid #ddd;
}

.book-spine {
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right,
            rgba(0, 0, 0, 0.35),
            rgba(255, 255, 255, 0.05));
}

.book-info {
    padding: 12px;
    min-height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.book-title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.book-author {
    margin-top: 8px;
    font-size: 0.8rem;
    color: #666;
}

.v-window-item .v-row {
    padding: 24px 12px;
    border-bottom: 8px solid #795548;
    background: linear-gradient(to bottom, #fafafa, #f0ebe5);
    border-radius: 8px;
}
</style>