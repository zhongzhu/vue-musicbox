<template>
  <nav class="panel is-primary">
    <a class="panel-block">
      <router-link to="/">All songs</router-link>
    </a>

    <p class="panel-heading">Playlists</p>

    <template v-for="(playlist, index) in playlists">
      <p class="panel-block playlist-item" :key="playlist.slug">
        <router-link :to="'/playlist/' + playlist.slug" class="planel-block">
          <span class="panel-icon">
            <fa-icon icon="book" />
          </span>
          {{ playlist.name }}
        </router-link>

        <template v-if="addingEnabled">
          <a v-if="!playlist.adding" @click="add_songs(index)" title="Add songs">
            <fa-icon icon="plus" />
          </a>
          <a v-else @click="add_songs(index)" title="Disable adding songs">
            <fa-icon icon="check-square" />
          </a>
        </template>
      </p>
    </template>

    <div class="panel-block">
      <form @submit.prevent="add_playlist">
        <div class="field has-addons">
          <input type="text" class="input" placeholder="New playlist" v-model="newPlaylistName" />
          <p class="control">
            <button type="submit" class="button is-success">
              <fa-icon icon="plus" />Add
            </button>
          </p>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import localforage from "localforage";

export default {
  props: {
    addingEnabled: {
      type: Boolean,
      default: false,
      required: false
    },
    selectedPlaylistsSlug: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      newPlaylistName: "",
      playlists: []
    };
  },
  watch: {
    playlists: {
      handler(playlists) {
        localforage.setItem("playlists", playlists);
      },
      deep: true
    },
    selectedPlaylistsSlug(slug) {
      this.$emit("setPlaylist", this.playlists.find(pl => pl.slug === slug));
    }
  },
  methods: {
    add_playlist() {
      this.playlists.push({
        name: this.newPlaylistName,
        slug: this.slugify(this.newPlaylistName),
        adding: false,
        songs: []
      });

      this.newPlaylistName = "";
    },
    add_songs(index) {
      this.playlists[index].adding = !this.playlists[index].adding;

      this.$emit(
        "setActivePlayLists",
        this.playlists.filter(pl => pl.adding === true)
      );
    },
    slugify(name) {
      return name
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
    }
  },
  created() {
    localforage
      .getItem("playlists")
      .then(data => {
        if (data !== null) {
          this.playlists = data;

          this.playlists.forEach((pl, index) => {
            this.playlists[index].adding = false;
          });
        }
      })
      .then(() => {
        if (this.selectedPlaylistsSlug !== undefined) {
          this.$emit(
            "setPlaylist",
            this.playlists.find(pl => pl.slug === this.selectedPlaylistsSlug)
          );
        }
      });
  }
};
</script>

<style scoped>
/* nav {
  position: fixed;
  width: inherit;
} */

.playlist-item {
  justify-content: space-between;
}
</style>