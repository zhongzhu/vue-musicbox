<template>
    <tbody >
      <template v-for="(song, index) in paginatedItem">
        <tr :key="index">
            <td>{{ song.artist }}</td>
            <td><slot name="add_title" :song="song"></slot>{{ song.title }}</td>
            <td>{{ song.album }}</td>
            <td>{{ song.genre }}</td>
            <td><slot name="custom_column" :song="song"></slot></td>
        </tr>
      </template>
    </tbody>
</template>

<script>
export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      per_page: {
        type: Number,
        required: false,
        default: 20
      }
    },
    data () {
      return {
        page: 1
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.items.length / this.per_page)
      },
      paginatedItem () {
        return this.items.slice(0, this.page * this.per_page)
      }
    },
    created () {
      window.addEventListener('scroll', () => {
        if (this.page >= this.totalPages) return
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
          this.page++
        }
      })
    },
    watch: {
      items () {
        this.page = 1
      }
    }
}
</script>

<style scoped>

@keyframes flash {
  from {background-color: green}
  to {background-color: inherit}
}

.flash {
  animation: flash 1s 1;
}
</style>