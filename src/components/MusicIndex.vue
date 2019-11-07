<template>
  <div class="columns">
    <div class="column is-3">
      <playlists />
    </div>
    <div class="column is-9">
      <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <sorted :songs="songs" @sortedSongs="sort_songs"/>
        <paginated :items="sortedSongs" />
      </table>
    </div>
  </div>
</template>

<script>
import MusicData from "@/assets/list.json"
import PaginatedTableBody from "@/components/PaginatedTableBody"
import MusicSort from '@/components/MusicSort'
import Playlists from '@/components/Playlists'

export default {
  components: {
    'sorted': MusicSort,
    'paginated': PaginatedTableBody,
    'playlists': Playlists
  },
  data() {
    return {
      songs: MusicData,
      sortedSongs: MusicData
    };
  },
  methods: {
    sort_songs (data) {
      this.sortedSongs = data
    }
  }
};
</script>

<style scoped>
</style>