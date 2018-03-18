<template lang="pug">
  #app
    board-game

</template>

<script>
import BoardGame from './components/BoardGame'

export default {
  name: 'App',
  components: {
    BoardGame,
  },
}
</script>

<style lang="stylus">
*
  box-sizing border-box
html,
body
  margin 0
  font-size 17px

#app
  display flex
  flex-flow row wrap
  align-items center
  justify-content center
  min-height 100vh
</style>