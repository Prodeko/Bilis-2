import { NewPlayer } from '.'

export const isNumber = (supposedNumber: unknown): supposedNumber is number => {
  return typeof supposedNumber === 'number' && !isNaN(supposedNumber)
}

export const isString = (supposedString: unknown): supposedString is string => {
  return typeof supposedString === 'string' || supposedString instanceof String
}

export const isNewPlayer = (supposedNewPlayer: unknown): supposedNewPlayer is NewPlayer => {
  const NewPlayer = supposedNewPlayer as NewPlayer

  return Boolean(
    NewPlayer.firstName &&
      NewPlayer.lastName &&
      NewPlayer.nickname &&
      NewPlayer.emoji &&
      NewPlayer.motto
  )
}