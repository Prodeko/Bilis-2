import { useSearchParams } from 'next/navigation'

const useSeasonalMode = (): { seasonal: boolean; toggleSeasonalMode: () => void } => {
  const params = useSearchParams()
  const seasonal = params.get('seasonal') === 'true'

  const toggleSeasonalMode = () => {
    window.location.replace(`?seasonal=${!seasonal}`)
  }

  return { seasonal, toggleSeasonalMode }
}

export default useSeasonalMode
