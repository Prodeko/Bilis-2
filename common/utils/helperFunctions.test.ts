import { calculateLongestContinuousSequence } from './helperFunctions'

describe('calculateLongestContinuousSequence', () => {
  describe('input array', () => {
    test('should return 0 on empty array', () => {
      expect(calculateLongestContinuousSequence([], () => true)).toBe(0)
    })

    test('should return length of the input if the predicate is always true', () => {
      expect(calculateLongestContinuousSequence([1, 2, 3, 1, 2, 3, 1, 2, 3], () => true)).toBe(9)
    })

    test('should return 0 if the predicate is always false', () => {
      expect(calculateLongestContinuousSequence([1, 2, 3, 1, 2, 3, 1, 2, 3], () => false)).toBe(0)
    })

    test('should return 1 if every other value matches', () => {
      expect(
        calculateLongestContinuousSequence([1, 2, 3, 4, 5, 6, 7, 8, 9], value => value % 2 === 0)
      ).toBe(1)
    })

    test('should return correct value if there is only one continuous sequence', () => {
      expect(
        calculateLongestContinuousSequence([0, 0, 1, 1, 1, 0, 0], value => Boolean(value))
      ).toBe(3)
    })

    test('should return longest sequence if it is preceeded by a shorter one', () => {
      expect(
        calculateLongestContinuousSequence([0, 1, 0, 1, 1, 1, 0, 0], value => Boolean(value))
      ).toBe(3)
    })

    test('should return length of longer sequence if it succeeded by a shorter one', () => {
      expect(
        calculateLongestContinuousSequence([0, 0, 0, 1, 1, 1, 0, 1, 0], value => Boolean(value))
      ).toBe(3)
    })
  })

  describe('predicate', () => {
    const truthyInputs = [true, 1, {}, [], 'asdf']
    const falsyInputs = [false, 0, '']

    test.each(truthyInputs)('%p counts as truthy', input => {
      expect(calculateLongestContinuousSequence([input])).toBe(1)
    })

    test.each(falsyInputs)('%p counts as falsy', input => {
      expect(calculateLongestContinuousSequence([input])).toBe(0)
    })
  })
})
