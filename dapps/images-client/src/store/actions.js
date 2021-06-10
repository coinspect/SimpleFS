import Files from '../lib/Files'
import { SET_SIZE, REQUEST_CHUNK, SET_CHUNK, SET_IMAGE, CLEAR_CHUNK_REQUESTS } from './mutationTypes'
import { mergeTypedArray } from '../lib/utils'

export const createClient = ({ getters }, chainId) => {
  const net = getters.getNetwork(chainId)
  if (!net) throw new Error(`Unknown network chainId:${chainId} `)
  if (!net.node) throw new Error(`Missing node for chaninid:${chainId}`)
  const client = Files(net.node)
  return client
}

export const createAddress = async ({ commit, getters }, { address, chainId }) => {
  let request = true
  try {
    const client = createClient({ getters }, chainId)

    const getCache = () => getters.getCache({ chainId, address })

    const getSize = async () => {
      let { size } = getCache()
      if (!size) {
        size = await client.getNoChunks(address)
        commit(SET_SIZE, { chainId, address, size })
      }
      return getCache().size
    }
    const chunkIsRequested = chunk => getters.isChunkRequested({ chainId, address, chunk })

    const getChunk = async chunk => {
      if (!request) throw new Error('Request canceled')
      if (chunkIsRequested(chunk)) return
      commit(REQUEST_CHUNK, { chainId, address, chunk })
      const data = await client.getChunk(address, chunk)
      commit(SET_CHUNK, { chainId, address, chunk, data })
      commit(CLEAR_CHUNK_REQUESTS, { chainId, address, chunk })
      return data
    }

    const getAddressData = () => getters.getAddressData({ chainId, address })

    const createImage = async () => {
      const size = await getSize()
      for (let chunk = 0; chunk < size; chunk++) {
        await getChunk(chunk)
      }
      const { chunks } = getCache()
      if (Object.keys(chunks).length !== size) return createImage()
      const arr = Object.keys(chunks).sort((a, b) => a - b).map(k => chunks[`${k}`])
      const image = mergeTypedArray(arr)
      commit(SET_IMAGE, { chainId, address, image })
      return image
    }

    const getImage = () => {
      const { image } = getCache()
      return image || createImage().catch(err => {
        if (request) throw err
      })
    }

    const cancelRequests = () => {
      request = false
    }

    return { getImage, chunkIsRequested, getAddressData, cancelRequests }
  } catch (err) {
    return Promise.reject(err)
  }
}
