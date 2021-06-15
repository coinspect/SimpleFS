import {
  CLEAR_CACHE,
  REQUEST_SIZE,
  SET_SIZE,
  SET_CHUNK,
  REQUEST_CHUNK,
  CLEAR_CHUNKS_REQUESTS,
  SET_IMAGE,
  LOG
} from './mutationTypes'
import Vue from 'vue'
import { createCacheObj } from './state'

export default {
  [CLEAR_CACHE] (state, { chainId, address }) {
    Vue.set(state.cache[chainId], address, createCacheObj())
  },
  [REQUEST_SIZE] (state, { chainId, address }) {
    state.requestedSizes.push({ chainId, address })
  },
  [SET_SIZE] (state, { chainId, address, size }) {
    Vue.set(state.cache[chainId][address], 'size', size)
    const requested = state.requestedSizes.filter(v => v.chainId !== chainId && v.address !== address)
    Vue.set(state.cache, 'requestedSizes', requested)
  },
  [SET_CHUNK] (state, { chainId, address, chunk, data, requestKey }) {
    Vue.set(state.cache[chainId][address].chunks, `${chunk}`, data)
    if (undefined !== requestKey) {
      const data = state.requestedChunks[requestKey]
      if (data) data.end = Date.now()
    }
  },
  [REQUEST_CHUNK] (state, { chainId, address, chunk }) {
    const start = Date.now()
    state.requestedChunks.push({ chainId, address, chunk, start })
  },
  [CLEAR_CHUNKS_REQUESTS] (state, { chainId, address }) {
    const requestedChunks = state.requestedChunks.filter(v => {
      return v.chainId !== chainId || v.address !== address
    })
    Vue.set(state, 'requestedChunks', requestedChunks)
  },
  [SET_IMAGE] (state, { chainId, address, image, extension, node }) {
    Vue.set(state.cache[chainId][address], 'image', image)
    Vue.set(state.cache[chainId][address], 'extension', extension)
    Vue.set(state.cache[chainId][address], 'created', Date.now())
    Vue.set(state.cache[chainId][address], 'node', node)
    Vue.delete(state.cache[chainId][address], 'chunks')
    Vue.set(state.cache[chainId][address], 'chunks', [])
    // Vue.set(state.cache[chainId][address], 'log', [])
  },
  [LOG] (state, { chainId, address, message }) {
    if (!message) return
    const date = Date.now()
    state.cache[chainId][address].log.push({ date, message })
  }
}
