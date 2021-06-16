<template lang="pug">
.file(v-if="chainId && address")
  h2 {{ meta.title }}
  template(v-if="imageUrl")
    img.pic(:src="imageUrl")
    ul.img-data
      li(v-if="imageDate")
        strong Received on:&nbsp;
        span {{ imageDate }}
      li(v-if="cache.node")
      strong from:&nbsp;
      span {{ cache.node }}
  .file-content(v-else)
    template(v-if="!imageUrl && !cache.size")
      img.pic.cached(
        v-if="!hideCache",
        v-show="undefined !== hideCache",
        :src="`cache/${chainId}/${address}.${meta.extension}`",
        @error="imgError",
        @load="imgLoaded"
      )
      p(v-show="!hideCache")
        em This is a cached image click
        button.btn(@click="getImageFromBC") &nbsp;here&nbsp;
        em to get it from &nbsp;
          strong {{ net.name }}
      //-button.btn(@click="getImageFromBC") {{ `Get image from ${net.name}` }}
    .frame(v-if="isRequestingSize && !cache.size")
      spinner
      small
        em Getting chunks size
    file-chunks(:chainId="chainId", :address="address")
  address-title(v-if="meta", :meta="meta", :address="address", :net="net")
  log-ctrl(v-if="cache.log.length", :log="cache.log")
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner.vue'
import FileChunks from '@/components/FileChunks.vue'
import AddressTitle from '@/components/AddressTitle.vue'
import LogCtrl from '@/components/LogCtrl.vue'
export default {
  name: 'file',
  props: ['chainId', 'address'],
  components: {
    Spinner,
    FileChunks,
    AddressTitle,
    LogCtrl
  },
  data () {
    return {
      imageUrl: undefined,
      addr: undefined,
      hideCache: undefined
    }
  },
  async created () {
    const { cache } = this
    if (cache.size) this.getImageFromBC()
  },
  beforeDestroy () {
    this.deleteImage()
    if (this.addr) this.addr.cancelRequests()
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
    },
    isRequestingSize () {
      const { isSizeRequested, chainId, address } = this
      return isSizeRequested()({ chainId, address })
    },
    meta () {
      const { getAddressData, chainId, address } = this
      return getAddressData()({ chainId, address })
    }
  },
  methods: {
    ...mapGetters(['getCache', 'getNetwork', 'isSizeRequested', 'getAddressData']),
    ...mapActions(['createAddress']),

    async getImageFromBC () {
      if (this.addr) return
      const { createAddress, chainId, address } = this
      this.addr = await createAddress({ chainId, address })
      const { getImage } = this.addr
      await getImage()
      this.createImage()
    },
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
    },
    imgError () {
      this.hideCache = true
      this.getImageFromBC()
    },
    imgLoaded () {
      this.hideCache = false
    }
  }
}
</script>
<style lang="stylus">
@import '../style/mixins.styl'
@import '../style/variables.styl'

.file
  max-width 100%
  display flex
  flex-flow column wrap
  align-items center
  .file-content
    display flex
    box-sizing border-box
    flex-flow column wrap
    align-items center
    max-width calc(100% - 4em)
    box-shadow boxShadow
    border gray 1px solid

    p
      margin 1em

  .meta
    margin 2em 0 0 0

.img-data
  list-style none
  text-align center
  font-size 0.8em
  margin 1em 0 0 0
  color gray
  max-width 90%
</style>
