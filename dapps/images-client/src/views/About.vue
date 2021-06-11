<template lang="pug">
.about
  .txt(v-html="test")
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
    margin: 0 auto
</style>
