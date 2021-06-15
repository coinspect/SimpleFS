
const findChunk = ({ chainId, address, chunk }) => (v) => {
  const match = v.chainId === chainId && v.address === address
  return (chunk !== undefined) ? (match && v.chunk === chunk) : match
}

export const getNetwork = state => chainId => state.config.networks[chainId]

export const getCache = state => ({ chainId, address }) => state.cache[chainId][address]

export const getChunkRequests = state => ({ chainId, address, chunk }) => {
  return state.requestedChunks.find(findChunk({ chainId, address, chunk }))
}

export const getAddressData = state => ({ chainId, address }) => {
  return state.config.networks[chainId].images[address]
}

export const getChunks = state => ({ chainId, address }) => getCache(state)({ chainId, address }).chunks

export const isChunkRequested = state => ({ chainId, address, chunk }) => {
  const chunks = getChunks(state)({ chainId, address })
  return chunks[chunk] || getChunkRequests(state)({ chainId, address, chunk })
}

export const getActiveNetworks = state => {
  const { networks } = state.config
  return Object.entries(networks)
    .filter(([key, net]) => Object.keys(net.images).length)
    .reduce((v, a) => {
      const [key, value] = a
      v[key] = value
      return v
    }, {})
}

export const getRequestedChunkKey = state => ({ chainId, address, chunk }) => {
  return state.requestedChunks.findIndex(findChunk({ chainId, address, chunk }))
}

export const getRequestedChunks = state => ({ chainId, address }) => {
  return state.requestedChunks.filter(findChunk({ chainId, address }))
}

export const getChunksTime = state => ({ chainId, address }) => {
  return getRequestedChunks(state)({ chainId, address })
    .reduce((v, a) => {
      const { start, end } = a
      return end ? v + (end - start) : v
    }, 0)
}

export const isSizeRequested = state => ({ chainId, address }) => {
  state.requestedSizes.find(findChunk({ chainId, address }))
}
