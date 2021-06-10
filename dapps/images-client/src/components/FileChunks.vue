<template lang="pug">
.chunks(v-if="size")
  .row(v-for="c in size")
    template(v-for="r in size")
      .chunk(
        :class="chunkCss(chunkNumber(c, r))",
        :id="`c-${chunkNumber(c, r)}`"
      )
  .row.frame
    ul.plain.small
      li Received {{chunksDone}} of {{ cache.size }} chunks
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'file-chunks',
  props: ['chainId', 'address'],
  computed: {
    cache () {
      const { chainId, address, getCache } = this
      return getCache()({ chainId, address })
    },
    size () {
      const { size } = this.cache
      return size ? Math.ceil(Math.sqrt(size)) : 0
    },
    chunksDone () {
      return Object.keys(this.cache.chunks).length
    }
  },
  methods: {
    ...mapGetters(['getCache', 'isChunkRequested']),
    chunkNumber (c, r) {
      return r - 1 + this.size * (c - 1)
    },
    chunkCss (chunk) {
      if (chunk > this.cache.size) return 'disabled'
      const { isChunkRequested, address, chainId, cache } = this
      const isRequested = isChunkRequested()({ address, chainId, chunk })
      const done = cache.chunks[chunk]
      if (done) return 'done'
      if (isRequested) return 'requested'
    }
  }
}
</script>
<style lang="stylus">
@import '../style/variables.styl'

.chunks
  display flex
  flex-flow column wrap
  align-items center
  margin 1em

.row
  display flex
  flex-flow row wrap

.chunk
  width 10px
  height 10px
  margin 1px
  background gray

  &.requested
    background info

  &.done
    background brand

  &.disabled
    background none
</style>
