const base = import.meta.env.BASE_URL

export function assetUrl(path) {
  return `${base}${path.replace(/^\//, '')}`
}
