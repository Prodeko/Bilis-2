import { NewPlayer } from '.'

export const isNumber = (supposedNumber: unknown): supposedNumber is number => {
  const forcedNumber = Number(supposedNumber)

  if (Number.isNaN(forcedNumber)) {
    return false
  }
  return true
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
