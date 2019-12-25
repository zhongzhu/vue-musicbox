<template>
  <thead>
    <tr>
      <th style="width: 30%">
        <a @click="changeSort('artist')">Artist</a>
        <fa-icon icon="chevron-up" v-if="sortBy == 'artist' && sortDirection == 'asc'" />
        <fa-icon icon="chevron-down" v-if="sortBy == 'artist' && sortDirection == 'desc'" />
      </th>
      <th style="width: 30%">
        <a @click="changeSort('title')">Title</a>
        <fa-icon icon="chevron-up" v-if="sortBy == 'title' && sortDirection == 'asc'" />
        <fa-icon icon="chevron-down" v-if="sortBy == 'title' && sortDirection == 'desc'" />
      </th>
      <th style="width: 20%">
        <a @click="changeSort('album')">Album</a>
        <fa-icon icon="chevron-up" v-if="sortBy == 'album' && sortDirection == 'asc'" />
        <fa-icon icon="chevron-down" v-if="sortBy == 'album' && sortDirection == 'desc'" />
      </th>
      <th style="width: 20%">
        <a @click="changeSort('genre')">Genre</a>
        <fa-icon icon="chevron-up" v-if="sortBy == 'genre' && sortDirection == 'asc'" />
        <fa-icon icon="chevron-down" v-if="sortBy == 'genre' && sortDirection == 'desc'" />
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortBy: "",
      sortDirection: "asc"
    };
  },
  watch: {
    songs () {
      this.sort_songs()
    }
  },
  methods: {
    changeSort(columnName) {
      if (this.sortBy === columnName && this.sortDirection === 'asc') {
        this.sortDirection = 'desc'
      } else {
        this.sortDirection = 'asc'
      }
      this.sortBy = columnName

      this.sort_songs()
    },
    sort_songs() {
      if (this.sortBy === "") {
        this.$emit("sortedSongs", this.songs);
      } else {
        let sortModifier = (this.sortDirection === "asc") ? 1 : -1;

        let sortedSongs = this.songs.slice().sort((a, b) => {
          let colA = a[this.sortBy].toUpperCase();
          let colB = b[this.sortBy].toUpperCase();

          if (colA < colB) {
            return -1 * sortModifier;
          } else if (colA == colB) {
            return 0;
          } else {
            return 1 * sortModifier;
          }
        });

        this.$emit("sortedSongs", sortedSongs);
      }
    }
  }
};
</script>

<style scoped>
</style>