export const isNumber = (supposedNumber: unknown): supposedNumber is number => {
  const forcedNumber = Number(supposedNumber)

  if (isNaN(forcedNumber)) {
    return false
  } else {
    return true
  }
}
