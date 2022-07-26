import type { Styles } from '@common/types'
export const logWithBase = (x: number, base: number): number => Math.log(x) / Math.log(base)

export const createCssClasses = (styles: Styles, baseClass: string, variation: string): string => {
  return `${styles[baseClass]} ${styles[`${baseClass}__${variation}`]}}`
}
