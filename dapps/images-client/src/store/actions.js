import Files from '../lib/Files'
import { SET_SIZE, REQUEST_CHUNK, SET_CHUNK, SET_IMAGE, CLEAR_CHUNKS_REQUESTS, LOG } from './mutationTypes'
import { mergeTypedArray } from '../lib/utils'

export const createClient = ({ getters }, chainId) => {
  const net = getters.getNetwork(chainId)
  if (!net) throw new Error(`Unknown network chainId:${chainId} `)
  if (!net.node) throw new Error(`Missing node for chaninid:${chainId}`)
  const { node } = net
  const client = Files(node)
  return { client, node }
}

export const createAddress = async ({ commit, getters }, { address, chainId }) => {
  let request = true
  try {
    const { client, node } = createClient({ getters }, chainId)

    const getCache = () => getters.getCache({ chainId, address })

    const getSize = async () => {
      let { size } = getCache()
      if (!size) {
        commit(LOG, { chainId, address, message: `Requesting size from ${node}` })
        size = await client.getNoChunks(address)
        commit(LOG, { chainId, address, message: `Received size of: ${address}, ${size} chunks` })
        commit(SET_SIZE, { chainId, address, size })
      }
      return getCache().size
    }
    const chunkIsRequested = chunk => getters.isChunkRequested({ chainId, address, chunk })

    const getChunk = async chunk => {
      if (!request) throw new Error('Request canceled')
      if (chunkIsRequested(chunk)) return
      commit(REQUEST_CHUNK, { chainId, address, chunk })
      const requestKey = getters.getRequestedChunkKey({ chainId, address, chunk })
      commit(LOG, { chainId, address, message: `Requesting chunk ${chunk} from ${node}` })
      const data = await client.getChunk(address, chunk)
      commit(LOG, { chainId, address, message: `Received chunk ${chunk} ${data.length} B` })
      commit(SET_CHUNK, { chainId, address, chunk, data, requestKey })
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
      const { extension } = getAddressData()
      commit(SET_IMAGE, { chainId, address, image, extension, node })
      commit(CLEAR_CHUNKS_REQUESTS, { chainId, address })
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
