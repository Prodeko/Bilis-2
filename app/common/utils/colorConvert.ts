export const intToHex = (n: number): string => {
  let acc = n
  let res = '#'
  for (let i = 0; i < 6; i += 1) {
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
