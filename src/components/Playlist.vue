<template>
  <div class="columns">
    <div class="column is-3">
      <playlists :selectedPlaylistSlug="selectedPlaylistSlug" @setPlaylist="set_playlist"/>
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
      selectedPlaylist: {},
      selectedPlaylistSlug: this.$route.params.slug,
      songs: [],
      sortedSongs: []
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