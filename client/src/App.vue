<template lang="pug">
  #app
    board-game

</template>

<script>
import BoardGame from './components/BoardGame'

export default {
  components: {
    BoardGame,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App!',
    }
  },
}
</script>

<style lang="stylus">
html,
body
  margin 0
  font-size 17px
</style>