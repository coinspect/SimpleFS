<template lang="pug">
.file
  template(v-if="cache.image")
    img.pic(:src="cache.image")
  ul.meta(v-if="meta")
    li.title
      span {{meta.title}}
    li
      span {{meta.description}}
      small(v-if="meta.width && meta.height") &nbsp; ({{meta.width}} x {{meta.height}})
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'file',
  props: ['chainId', 'address'],
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
    ...mapGetters(['getCache']),
    cache () {
      const { getCache, address, chainId } = this
      return getCache({ address, chainId })
    }
  },
  methods: {
    ...mapActions(['createAddress'])
  }
}
</script>
<style lang="stylus">
  .file
    min-height 100px
  ul.meta
    list-style none
    text-align center
    .title
      font-weight bold
</style>
