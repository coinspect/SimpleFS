<template lang="pug">
.file(v-if="chainId && address")
  h2 {{meta.title}}
  template(v-if="imageUrl")
    img.pic(:src="imageUrl")
    ul.plain.small.txt-center
      li(v-if="imageDate")
        strong Received on:&nbsp;
        span {{ imageDate }}
      li(v-if="cache.node")
      strong from:&nbsp;
      span {{ cache.node }}
  template(v-else)
    .frame(v-if="!cache.size")
      spinner
      small
        em Getting chunks size
    file-chunks(:chainId="chainId", :address="address")
  address-title(v-if="meta", :meta="meta", :address="address", :net="net")
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner.vue'
import FileChunks from '@/components/FileChunks.vue'
import AddressTitle from '@/components/AddressTitle.vue'
export default {
  name: 'file',
  props: ['chainId', 'address'],
  components: {
    Spinner,
    FileChunks,
    AddressTitle
  },
  data () {
    return {
      meta: {},
      imageUrl: undefined,
      addr: undefined
    }
  },
  async created () {
    const { createAddress, chainId, address } = this
    this.addr = await createAddress({ chainId, address })
    const { getImage, getAddressData } = this.addr
    this.meta = getAddressData()
    await getImage()
    this.createImage()
  },
  beforeDestroy () {
    this.deleteImage()
    this.addr.cancelRequests()
  },
  computed: {
    net () {
      const { getNetwork, chainId } = this
      return getNetwork()(chainId)
    },
    cache () {
      const { getCache, address, chainId } = this
      return getCache()({ address, chainId })
    },
    imageDate () {
      const { created } = this.cache
      return created ? new Date(created) : undefined
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
</style>
