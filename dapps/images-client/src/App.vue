<template lang="pug">
#app
  nav#nav
    router-link(to="/")
      ul.title
        li.brand ajlopez
        li
          small tribute dapp
    ul.menu
      li
        router-link(to="/") Home
      li
        router-link(to="/about") About
  section.content
    router-view
  footer#footer
    ul.small
      li June 2021
    ul
      li
        router-link(to="/about") In memorial to Ángel Java López
    ul
      li
        a(v-if="githubRepo", :href="githubRepo") GitHub
</template>
<script>
export default {
  name: 'app',
  computed: {
    githubRepo () {
      return this.$store.state.config.githubUrl
    }
  }
}
</script>
<style lang="stylus">
@import './style/main.styl'
</style>
