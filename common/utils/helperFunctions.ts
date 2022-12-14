export const logWithBase = (x: number, base: number): number => Math.log(x) / Math.log(base)

export const permutator = <T>(inputArr: T[]) => {
  /**
   * Takes array as input and returns an array of the different permutations.
   * @param {T[]} inputArr Input array, can be arbitrary type
   * @return {T[][]}       Output permutations
   */

  const result: Array<T[]> = []

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}
