
import config from '../lib/config'

export const createCacheObj = () => {
  return {
    chunks: {},
    size: undefined,
    image: undefined
  }
}

export const createCache = () => {
  const { networks } = config
  return Object.keys(networks).reduce((v, a) => {
    v[a] = Object.keys(networks[a].images).reduce((v, a) => {
      v[a] = createCacheObj()
      return v
    }, {})
    return v
  }, {})
}

export default {
  config,
  requestedChunks: [],
  cache: createCache()
}
