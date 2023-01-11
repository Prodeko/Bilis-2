import { Player, PlayerStats } from '@common/types'

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

export const formatFullName = (player: Player) =>
  `${player.firstName} "${player.firstName}" ${player.lastName}`

/**
 * Returns player game stats
 *
 * @param wonGames Amount of games player has won
 * @param lostGames Amount of games player has lost
 *
 * @return Game stats
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
