<template lang="pug">
.tile(@click='makeMark')
  | {{ mark }}
</template>

<script>
export default {
  name: 'Tile',
  props: {
    value: {
      type: Number,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visual: ['', '❌', '⭕', '✔️'],
    }
  },
  computed: {
    mark() {
      return this.visual[this.value]
    },
  },
  methods: {
    makeMark() {
      this.$emit('makeMove', {
        row: this.row,
        column: this.column,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.tile
  height          150px
  width           150px
  background      #eee
  font-size       100px
  display         flex
  flex-flow       row wrap
  align-items     center
  justify-content center
  margin 10px
  box-shadow inset 2px 2px 25px 5px darken(#eee, 25%)
  border-radius 5px
  position relative
  text-shadow 2px 2px 15px #000000
  -moz-user-select: none; /* Firefox */
  user-select none
</style>

