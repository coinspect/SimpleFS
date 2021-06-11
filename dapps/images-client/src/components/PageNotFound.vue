<template lang="pug">
  .not-found
    h1 404
    h2 Page not found
</template>
<script>
export default {
  name: 'page-not-found'
}
</script>
<style lang="stylus">
@import '../style/mixins.styl'
@import '../style/variables.styl'
  .not-found
    flex-centered()
    flex-flow column wrap
    h1
      margin 0
      font-size 10em
      text-shadow textShadow
    h2
      font-size 2.5em
</style>
