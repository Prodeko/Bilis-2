export type Action =
  | {
      type: 'NORMAL_SIDEBAR'
      payload: 'normal'
    }
  | {
      type: 'PARTIAL_SIDEBAR'
      payload: 'partial'
    }
  | {
      type: 'FULL_SIDEBAR'
      payload: 'full'
    }

export const setNormalSidebar = (): Action => {
  return { type: 'NORMAL_SIDEBAR', payload: 'normal' }
}

export const setPartialSidebar = (): Action => {
  return { type: 'PARTIAL_SIDEBAR', payload: 'partial' }
}

export const setFullSidebar = (): Action => {
  return { type: 'FULL_SIDEBAR', payload: 'full' }
}
