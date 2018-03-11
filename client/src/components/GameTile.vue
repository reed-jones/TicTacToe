<template lang="pug">
.tile
</template>

<script>
export default {
  props: {
    tile: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    tile: this.tile,
  }),
}
</script>


<style lang="stylus" scoped>
.tile
  height 200px
  width 200px
  background #666
</style>

