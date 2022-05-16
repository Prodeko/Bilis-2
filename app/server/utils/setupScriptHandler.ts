type SetupScript = {
  timestamp: number
  fn: () => Promise<void>
}

declare global {
  var setupScriptData: { [key: string]: SetupScript } | undefined | null
}

export const checkSetupScript = async (key: string, fn: () => Promise<void>) => {
  if (!global.setupScriptData) {
    global.setupScriptData = {}
  }
  if (!(key in global.setupScriptData)) {
    global.setupScriptData[key] = { timestamp: Date.now(), fn }
    await fn()
  }
}
