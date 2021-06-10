
export const parseFileName = filename => {
  const p = filename.indexOf('.')
  const address = p >= 0 ? filename.substring(0, p) : filename
  const extension = p >= 0 ? filename.substring(p + 1) : ''
  return { address, extension }
}

export const parseImages = images => {
  for (const address in images) {
    const { name } = images[address]
    if (name) {
      images[address].extension = parseFileName(name).extension
    }
  }
  return images
}

export const mergeTypedArray = (arr, ArrType = Uint8Array) => {
  const sizes = arr.map(v => v.length)
  const sum = x => x.reduce((a, b) => a + b, 0)
  return arr.reduce((v, a, i) => {
    v.set(a, sum(sizes.slice(0, i)))
    return v
  }, new ArrType(sum(sizes)))
}

export const getGithubUrl = (url) => {
  const domain = 'github.com'
  const base = `https://${domain}`
  if (!url.includes(domain)) return
  if (new RegExp(`^${base}`).test(url)) return url
  const p = url.slice(url.indexOf(domain) + domain.length + 1, url.length)
  if (p) return `${base}/${p}`
}
