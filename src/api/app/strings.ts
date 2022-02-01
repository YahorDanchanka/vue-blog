export function cut(text: string, end: string = '...', length: number = 210) {
  if (text.length <= length) return text
  return text.slice(0, length) + end
}

export function encode(text: string) {
  return text.replace(/<\/?[a-z0-9]+>/gi, '')
}
