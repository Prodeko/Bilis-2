import type { Styles } from '@common/types'
export const logWithBase = (x: number, base: number): number => Math.log(x) / Math.log(base)

// Get the base class from module automatically by
// matching the "baseClass" part from
// the {baseClass}__{variation} key
const getBaseClass = (module: Styles) => {
  const key = Object.keys(module)[0]
  const regexPattern = /^(\w+)__/
  const matches = key.match(regexPattern)
  const baseClass = matches ? matches[1] : key
  return baseClass
}

export const getCssClass = (module: Styles, variation: string): string => {
  const baseClass = getBaseClass(module)
  const variationClass = module[`${baseClass}__${variation}`]
  return `${baseClass} ${variationClass}`
}
