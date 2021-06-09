<template lang="pug">
#app
  #nav
    ul
      li
        router-link(to="/") Home
  router-view
</template>

<style lang="stylus">
@import './style/main.styl'
</style>
