<template>
  <p class="control has-icons-left">
    <input class="input" type="text" placeholder="Search for song titles ..." v-model="searchInput" />

    <span class="icon is-small is-left"><fa-icon icon="search" /></span>
  </p>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      searchInput: ''
    }
  },
  watch: {
    searchInput (searchTerm) {
      this.search(searchTerm)
    }
  },
  methods: {
    search (searchTerm) {
      if (searchTerm === '') {
        this.$emit('filteredSongs', this.songs)
        return
      }

      let filteredSongs = this.songs.filter(song => {
        return (song.title.includes(searchTerm) || song.album.includes(searchTerm) || song.artist.includes(searchTerm))
      })

      this.$emit('filteredSongs', filteredSongs)
    }
  }
}
</script>

<style>

</style>