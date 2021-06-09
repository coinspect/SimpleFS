import {
  CLEAR_CACHE,
  SET_SIZE,
  SET_CHUNK,
  REQUEST_CHUNK,
  CLEAR_CHUNK_REQUESTS,
  SET_IMAGE
} from './mutationTypes'
import Vue from 'vue'
import { createCacheObj } from './state'

export default {
  [CLEAR_CACHE] (state, { chainId, address }) {
    Vue.set(state.cache[chainId], address, createCacheObj())
  },
  [SET_SIZE] (state, { chainId, address, size }) {
    Vue.set(state.cache[chainId][address], 'size', size)
  },
  [SET_CHUNK] (state, { chainId, address, chunk, data }) {
    Vue.set(state.cache[chainId][address].chunks, `${chunk}`, data)
  },
  [REQUEST_CHUNK] (state, { chainId, address, chunk }) {
    state.requestedChunks.push({ chainId, address, chunk })
  },
  [CLEAR_CHUNK_REQUESTS] (state, { chainId, address, chunk }) {
    const requestedChunks = state.requestedChunks.filter(v => {
      return v.chainId !== chainId || v.address !== address || v.chunk !== chunk
    })
    Vue.set(state, 'requestedChunks', requestedChunks)
  },
  [SET_IMAGE] (state, { chainId, address, image, extension }) {
    Vue.set(state.cache[chainId][address], 'image', image)
    Vue.set(state.cache[chainId][address], 'extension', extension)
    Vue.set(state.cache[chainId][address], 'chunks', [])
  }
}
