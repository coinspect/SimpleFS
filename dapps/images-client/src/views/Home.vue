<template lang="pug">
.home
  h1 Angel Java Lopez Paintings
  template(
    v-for="net, chainId in networks",
    v-if="Object.keys(net.images).length"
  )
    h2 {{ net.name }}
    ul.images.plain
      li(v-for="img, address in net.images")
        router-link.img-box(:to="`/image/${chainId}/${address}`")
          address-title(:meta="img" :address="address")
</template>
<script>
import config from '../../src/lib/config'
import AddressTitle from '@/components/AddressTitle.vue'

export default {
  name: 'Home',
  components: {
    AddressTitle
  },
  data () {
    return config
  }
}
</script>
<style lang="stylus">
@import '../style/variables.styl'
  .home
    display flex
    flex-flow column wrap
    align-items center
  .img-box
    border brand dashed 1px
    display flex
    padding .5em
    &:hover
      border hoverColor dashed 1px
  ul.images
    > li
      margin 1em
</style>
