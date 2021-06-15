
import Vue from 'vue'

export const mToSeconds = Vue.filter('m-to-seconds', miliseconds => {
  let seconds = Math.floor(miliseconds / 1000)
  seconds = seconds >= 0 ? seconds : 0
  return seconds
})

export const mToTime = Vue.filter('m-to-time', miliseconds => new Date(parseInt(miliseconds)).toISOString().substr(11, 8))
