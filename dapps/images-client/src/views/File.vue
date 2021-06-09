<template lang="pug">
.file(v-if="chainId && address")
  h2 {{ address }}
  h3 {{net.name}}
  template(v-if="cache.image")
    img.pic(:src="cache.image")
  template(v-else)
    spinner(v-if="!cache.size")
    file-chunks(:chainId="chainId", :address="address")
  ul.meta(v-if="meta")
    li.title
      span {{ meta.title }}
    li
      span {{ meta.description }}
      small(v-if="meta.width && meta.height") &nbsp; ({{ meta.width }} x {{ meta.height }})
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '../components/Spinner.vue'
import FileChunks from '../components/FileChunks.vue'
export default {
  name: 'file',
  props: ['chainId', 'address'],
  components: {
    Spinner,
    FileChunks
  },
  data () {
    return {
      meta: {}
    }
  },
  async created () {
    const { createAddress, chainId, address } = this
    const { getImage, getAddressData } = await createAddress({ chainId, address })
    this.meta = getAddressData()
    getImage()
  },
  computed: {
    net () {
      const { getNetwork, chainId } = this
      return getNetwork()(chainId)
    },
    cache () {
      const { getCache, address, chainId } = this
      return getCache()({ address, chainId })
    }
  },
  methods: {
    ...mapGetters(['getCache', 'getNetwork']),
    ...mapActions(['createAddress'])
  }
}
</script>
<style lang="stylus">
.file
  min-height 100px
  display flex
  flex-flow column wrap
  align-items center
  margin 1em

ul.meta
  list-style none
  text-align center

  .title
    font-weight bold
</style>
