import { Player, PlayerStats } from '@common/types'

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
  `${player.firstName} "${player.nickname}" ${player.lastName}`

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
/**
 * Scrolls the list element smoothly and keeps the selected element in the center
 *
 * @remarks Dom element id (NOTE! dont use a class name)
 *
 * @param domElementId - DOM element id
 * @returns Function that can be called to smoothly center the list
 */
export const createSmoothScrollFn = (domElementId: string) => {
  return () => {
    document.getElementById(domElementId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

/**
 * Return a string formatted date in DD.MM.YYYY HH.MM format
 *
 * @param isoStringDate - Date in isoString format
 * @returns Localized, formatted date string
 */
export const formatIsoStringToDate = (isoStringDate: string) => {
  const date = new Date(isoStringDate)
  return Intl.DateTimeFormat('fi-FI', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}
