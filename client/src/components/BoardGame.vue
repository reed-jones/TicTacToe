<template lang="pug">
.board
  game-tile
</template>

<script>
import GameTile from './GameTile'

export default {
  components: {
    GameTile,
  },
  data: () => ({
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  }),
}
</script>


<style lang="stylus" scoped>
.board
  height 600px
  width 600px
  background #eee
</style>

