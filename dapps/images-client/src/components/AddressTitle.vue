<template lang="pug">
ul.meta(v-if="meta")
  li.title
    span {{ meta.title }}
  li
    span {{ meta.description }}
    small(v-if="meta.width && meta.height") &nbsp; ({{ meta.width }} x {{ meta.height }})
  li(v-if="address")
    a(
      v-if="net && net.explorer",
      :href="`${net.explorer}/address/${address}`",
      target="_blank",
      title="Open in explorer"
    )
      small {{ address }}
    small(v-else) {{ address }}
</template>
<script>
export default {
  name: 'address-title',
  props: ['address', 'meta', 'net']
}
</script>
<style lang="stylus">
  .meta
    list-style none
    text-align center

    .title
      font-weight bold
</style>
