export const isNumber = (supposedNumber: unknown): supposedNumber is number => {
  const forcedNumber = Number(supposedNumber)

  if (Number.isNaN(forcedNumber)) {
    return false
  }
  return true
}
