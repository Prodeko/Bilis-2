import type { NextPage } from 'next'
import { FiX } from "react-icons/fi";
import LeaderboardItem from '../Home/LeaderboardItem'


type Props = {
    children: JSX.Element
    onMouseEnter: () => void
    onClick: () => void
    marginP: Boolean
    marginF: Boolean
}



const SidebarButton: NextPage<Props> = ({ children, marginP, marginF, onMouseEnter, onClick }) => {

    if (!marginF) {
        return (
            <div className={`bg-gray-100 hover:bg-blue-50 rounded-[48px]  h-24 ${marginP ? 'w-40' : 'w-24'} mx-6 my-4 flex items-center justify-left duration-200 shadow-2xl transition-background hover:cursor-pointer`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseEnter}
                onClick={onClick}>
                <div className='ml-7'>{children}</div>
            </div>
        )
    }
    return (
        <div className='flex flex-col bg-white mx-6 my-4 h-full rounded-[48px] shadow-xl hover:scale-[1.005] rounded-md gap-5 hover:cursor-pointer transition-all'
        >
            <div className='flex flex-none w-full'>
                <div className='flex-none mt-6 ml-6 mr-4 '>{children}</div>
                <form className="w-full max-w-sm mt-4 mr-4 ">
                    <div className="flex items-center border-b-4 border-prodekoBlue py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Etsi pelaajaa" aria-label="Full name" />

                    </div>
                </form>
                <button onClick={onClick} className="flex-none border-transparent mt-6 mr-6 text-sm rounded" type="button">
                    <FiX size="36" />
                </button>
            </div>
            <div className='flex-none rounded-[48px] h-96 overflow-auto mt-8'>
                <LeaderboardItem />
                <LeaderboardItem />
                <LeaderboardItem />
                <LeaderboardItem />
                <LeaderboardItem />
                <LeaderboardItem />
            </div>

        </div>
    )
}

export default SidebarButton