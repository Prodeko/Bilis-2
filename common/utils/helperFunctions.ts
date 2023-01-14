import { Player, PlayerStats } from '@common/types'

export const logWithBase = (x: number, base: number): number => Math.log(x) / Math.log(base)

/**
 * Takes array as input and returns an array of the different permutations.
 * @param inputArr - Input array, can be arbitrary type
 * @returns Output permutations
 *
 * @example
 * ```
 * const inputArr = [1, 2, 3]
 * permutator(inputArr)
 * // [ [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1] ]
 * ```
 */
export const permutator = <T>(inputArr: T[]) => {
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

/**
 * Formats player's full name give a player object
 *
 * @param player - Player object
 * @returns Formatted full name
 */
export const formatFullName = (player: Player) =>
  `${player.firstName} "${player.firstName}" ${player.lastName}`

/**
 * Returns player game stats
 *
 * @param wonGames - Amount of games player has won
 * @param lostGames - Amount of games player has lost
 * @returns Game stats
 */
export const computePlayerStats = (wonGames: number, lostGames: number): PlayerStats => {
  const totalGames = wonGames + lostGames
  const winPercentage = totalGames === 0 ? 0 : (wonGames / totalGames) * 100
  return {
    wonGames,
    lostGames,
    totalGames,
    winPercentage,
  }
}
