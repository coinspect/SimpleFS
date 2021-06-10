<template lang="pug">
.file(v-if="chainId && address")
  h2
    span(v-if="net.explorer")
      a(
        :href="`${net.explorer}/address/${address}`",
        target="_blank",
        title="show in explorer"
      ) {{ address }}
    span(v-else) {{ address }}
  h3 {{ net.name }}
  template(v-if="imageUrl")
    img.pic(:src="imageUrl")
  template(v-else)
    .frame(v-if="!cache.size")
      spinner
      small
        em Getting chunks size
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
      meta: {},
      imageUrl: undefined
    }
  },
  async created () {
    const { createAddress, chainId, address } = this
    const { getImage, getAddressData } = await createAddress({ chainId, address })
    this.meta = getAddressData()
    await getImage()
    this.createImage()
  },
  beforeDestroy () {
    this.deleteImage()
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
    ...mapActions(['createAddress']),

    deleteImage () {
      const { imageUrl } = this
      if (imageUrl) URL.revokeObjectURL(imageUrl)
      this.imageUrl = undefined
    },

    createImage () {
      const { imageUrl } = this
      if (imageUrl) return imageUrl
      const { image } = this.cache
      const { extension } = this.meta
      if (image && extension) {
        const type = `image/${extension}`
        this.imageUrl = URL.createObjectURL(new Blob([image.buffer], { type }))
      }
      return this.imageUrl
    }
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
