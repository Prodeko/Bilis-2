import { robustGameScore } from './gameStats'

/**
 * Helper function used to calculate {@link robustGameScore} for fargo ratings
 * @param x - Nonimator input for natural logarithm
 * @param base - Denonimator input for natural logarithm
 * @returns Floating point number
 */
export const logWithBase = (x: number, base: number): number => Math.log(x) / Math.log(base)

/**
 * Takes array as input and returns an array of the different permutations of the original array.
 * @param inputArr - Generic input array
 * @returns Array of permutations arrays
 *
 * @example
 * ```
 * const inputArr = [1, 2, 3]
 * permutator(inputArr)
 * // [ [ 1, 2, 3 ], [ 1, 3, 2 ], [ 2, 1, 3 ], [ 2, 3, 1 ], [ 3, 1, 2 ], [ 3, 2, 1 ] ]
 * ```
 */
export const permutator = <T>(inputArr: T[]): T[][] => {
  let result: T[][] = []

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}
