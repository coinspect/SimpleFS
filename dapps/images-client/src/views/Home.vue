<template lang="pug">
.home
  h1 Angel Java Lopez
  template(
    v-for="net, chainId in networks",
    v-if="Object.keys(net.images).length"
  )
    h2 {{ net.name }}
    ul.images
      li(v-for="img, address in net.images")
        router-link(:to="`/image/${chainId}/${address}`") {{ img.title }} - {{ img.description }}
</template>
<script>
// @ is an alias to /src
import config from '../../src/lib/config'

export default {
  name: 'Home',
  data () {
    return config
  }
}
</script>
