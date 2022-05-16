export const intToHex = (n: number): string => {
  let acc = n
  let res = '#'
  for (let i = 0; i < 6; i++) {
    const current = acc % 16
    if (current < 10) res += current
    else {
      switch (current) {
        case 10:
          res += 'a'
          break
        case 11:
          res += 'b'
          break
        case 12:
          res += 'c'
          break
        case 13:
          res += 'd'
          break
        case 14:
          res += 'e'
          break
        case 15:
          res += 'f'
          break
        default:
          throw new Error('Invalid color number value')
      }
    }
    acc = (acc - current) / 16
  }
  return res
}

const hexToNum = (s: string): number => {
  const num = Number(s)
  if (num + 1) {
    return num
  }
  switch (s) {
    case 'a':
      return 10
    case 'b':
      return 11
    case 'c':
      return 12
    case 'd':
      return 13
    case 'e':
      return 14
    case 'f':
      return 15
  }
  throw new Error('Invalid color hex value')
}

export const hexToInt = (hex: string): number => {
  const s = hex
    .toLocaleLowerCase()
    .split('')
    .filter(s => s !== '#')
    .map(hexToNum)
  if (s.length !== 6) {
    throw new Error('Invalid hex length')
  }
  return s.reduceRight((acc, val) => acc * 16 + val, 0)
}
