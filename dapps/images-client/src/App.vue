<template lang="pug">
#app
  nav#nav
    .title
      span ajlopez
    ul.menu
      li
        router-link(to="/") Home
      li
        router-link(to="/about") About
  router-view
</template>

<style lang="stylus">
@import './style/main.styl'
</style>
