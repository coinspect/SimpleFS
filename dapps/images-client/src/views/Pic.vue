<template lang="pug">
.image
  pre {{ chainId }} {{ address }}
  pre {{ cache.size }} {{ cache.chunks.lenght }}
  img(:src="cache.image")
  pre {{meta.description}}
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'pic',
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
