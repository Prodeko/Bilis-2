import { useSearchParams } from 'next/navigation'

const useSeasonalMode = (): boolean => {
  const params = useSearchParams()

  return params.get('seasonal') === 'true'
}

export default useSeasonalMode
