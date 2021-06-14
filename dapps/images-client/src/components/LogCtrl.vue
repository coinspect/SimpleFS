<template lang="pug">
.log(v-if="log")
  .log-entry(v-for="line in log.slice().reverse()")
    small [{{ new Date(line.date).toLocaleString() }}]&nbsp;-&nbsp;
    em {{ line.message }}
</template>
<script>
export default {
  name: 'log-ctrl',
  props: ['log']
}
</script>
<style lang="stylus">
@import '../style/variables.styl'

.log
  margin 2em 0
  font-family fontMonospace
  font-size 0.75em
  height 12em
  overflow-y scroll
  resize vertical
  background black
  box-shadow boxShadow
  .log-entry
    margin .5em 2em
</style>
