<template>
  <nav class="panel is-primary">
    <p class="panel-heading">Playlists</p>

    <div class="panel-block">
      <router-link to="/music">All songs</router-link>
    </div>
    
    <template v-for="(playlist, index) in playlists">
      <p class="panel-block" :key="playlist.slug">
        <router-link :to="'music/playlist/' + playlist.slug">
          <span class="panel-icon"><font-awesome-icon icon="book"/> </span> {{ playlist.name }}
        </router-link>

        <template v-if="addingEnabled">
          <div v-if="!playlist.adding" @click="add_songs(index)" title="Add songs"><font-awesome-icon icon="plus"/></div>
          <div v-if="playlist.adding" @click="add_songs(index)" title="Disable adding songs"><font-awesome-icon icon="check-square"/></div>
        </template>
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
  props: {
    addingEnabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
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
        adding: false,
        songs: []
      })

      this.newPlaylistName = ''
    },
    add_songs (index) {
      this.playlists[index].adding
    },  
    slugify (name) {
      return name.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, '-and-').replace(/[^\w-]+/g, '').replace(/--+/g, '-')
    }
  },
  created () {
    localforage.getItem('playlists')
    .then(data => {
      if (data !== null) {
        this.playlists = data

        this.playlists.forEach((pl, index) => {
          this.playlists[index].adding = false
        })
      }
    })
  }
}
</script>

<style>

</style>