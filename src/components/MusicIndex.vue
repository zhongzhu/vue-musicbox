<template>
  <div class="columns">
    <div class="column is-3">
      <playlists addingEnabled @setActivePlaylists="set_active_playlists" />
    </div>
    <div class="column is-9">
      <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <sorted :songs="songs" @sortedSongs="sort_songs"/>
        
        <paginated :items="sortedSongs">
          <template slot="add_title" slot-scope="songList" v-if="activePlaylists.length > 0">
            <a @click="add_song(songList.song, $event.target)"><fa-icon icon="plus"/></a>
          </template>
        </paginated>
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
      sortedSongs: MusicData,
      activePlaylists: []
    };
  },
  methods: {
    sort_songs (data) {
      this.sortedSongs = data
    },
    set_active_playlists (playlists) {
      this.activePlaylists = playlists
    },
    add_song (song, e) {
      e.closest("tr").classList.add("flash")
      setTimeout(() => e.closest("tr").classList.remove("flash"), 1000)

      this.activePlaylists.forEach((pl, index) => {
        this.activePlaylists[index].songs.push(song)
      })
    }
  }
};
</script>

<style scoped>
</style>