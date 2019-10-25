<template>
    <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
            <th id="artist"><a @click="changeSort('artist')">Artist</a><font-awesome-icon icon="chevron-up" v-if="sortBy == 'artist' && sortDirection == 'asc'"/><font-awesome-icon icon="chevron-down" v-if="sortBy == 'artist' && sortDirection == 'desc'"/></th>
            <th id="title"><a @click="changeSort('title')">Title</a></th>
            <th id="album"><a @click="changeSort('album')">Album</a></th>
            <th id="genre"><a @click="changeSort('genra')">Genre</a></th>
        </thead>

        <tbody v-for="(song, index) in sortedSongs" :key="index">
            <tr class="">
                <td>{{ song.artist }}</td>
                <td>{{ song.title }}</td>
                <td>{{ song.album }}</td>
                <td>{{ song.genre }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import MusicData from '@/assets/list.json'

export default {
    data () {
        return {
            songs: MusicData,
            sortBy: '',
            sortDirection: 'asc'
        }
    },

    computed: {
        sortedSongs () {
            if (this.sortBy === '') {
                return this.songs
            } else {
                let sortModifier = (this.sortDirection === 'asc') ? 1 : -1
                return this.songs.slice().sort((a, b) => {
                    let colA = a[this.sortBy].toUpperCase()
                    let colB = b[this.sortBy].toUpperCase()

                    if (colA < colB) {
                        return -1 * sortModifier
                    } else if (colA == colB) {
                        return 0
                    } else {
                        return 1 * sortModifier
                    }
                })
            }



        }
    },

    methods: {
        changeSort(columnName) {
            this.sortBy = columnName
            this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc'
        }
    }
}
</script>

<style scoped>
    #artist {
        width:30%
    }

    #title {
        width:30%
    }

    #album {
        width:30%
    }

    #genre {
        width:20%
    }
</style>