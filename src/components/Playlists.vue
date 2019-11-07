<template>
  <nav class="panel is-primary">
    <p class="panel-heading">Playlists</p>

    <template v-for="playlist in playlists">
      <p class="panel-block" :key="playlist.slug">
        <span class="panel-icon"><font-awesome-icon icon="book"/> </span> {{ playlist.name }}
      </p>
    </template>

    <div class="panel-block">
      <form @submit.prevent="add_playlist">
        <div class="field has-addons">
          <input type="text" class="input" placeholder="New playlist" v-model="newPlaylistName"/>
          <p class="control"><button type="submit" class="button is-success"><font-awesome-icon icon="plus"/>Add</button></p>
        </div>
      </form>
    </div>
  </nav>  
</template>

<script>
import localforage from 'localforage'

export default {
  data () {
    return {
      newPlaylistName: '',
      playlists: []
    }
  },
  watch: {
    playlists: {
      handler (playlists) {
        localforage.setItem('playlists', playlists)
      },
      deep: true
    }
  },
  methods: {
    add_playlist () {
      this.playlists.push({
        name: this.newPlaylistName,
        slug: this.slugify(this.newPlaylistName),
        songs: []
      })
    },
    slugify (name) {
      return name.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, '-and-').replace(/[^\w-]+/g, '').replace(/--+/g, '-')
    },
    created () {
      localforage.getItem('playlists')
      .then(data => {
        if (data !== null) {
          this.playlists = data
        }
      })
    }
  }
}
</script>

<style>

</style>