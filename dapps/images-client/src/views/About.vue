<template lang="pug">
.about
  .txt(v-html="test")
  .flex-centered
    router-link.btn(to="/") Angel's blockchain gallery
</template>
<script>
import test from '../../About.md'
export default {
  name: 'about',
  data () {
    return {
      test
    }
  }
}
</script>
<style lang="stylus">
.about
  margin 0 auto

  .txt
    margin 0 2em
    font-size 1.125em
    line-height 1.625em
</style>
