
export const getNetwork = state => chainId => state.config.networks[chainId]

export const getCache = state => ({ chainId, address }) => state.cache[chainId][address]

export const getChunkRequests = state => ({ chainId, address, chunk }) => {
  return state.requestedChunks.find(v => {
    return v.chainId === chainId && v.address === address && v.chunk === chunk
  })
}

export const getAddressData = state => ({ chainId, address }) => {
  return state.config.networks[chainId].images[address]
}

export const isChunkRequested = state => ({ chainId, address, chunk }) => {
  const { chunks } = getCache(state)({ chainId, address })
  return chunks[chunk] || getChunkRequests(state)({ chainId, address, chunk })
}
