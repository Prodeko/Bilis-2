import type { NextPage } from 'next'

const LeaderboardItem: NextPage = () => {
  return(
    <div className='bg-white m-4 shadow-xl px-8 py-4 rounded-md flex items-center justify-between gap-5'>
      <div>1.</div>
      <div className='shadow-l w-14 h-14 rounded-full bg-blue-500 flex justify-center items-center text-xl'>😍</div>
      <h5 className='font-bold'>Pelaajanimi</h5>
      <p>Pisteet</p>
    </div>
  )
}

export default LeaderboardItem