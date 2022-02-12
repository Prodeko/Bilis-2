import type { NextPage } from 'next'


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
            <div className={`bg-gray-100 hover:bg-blue-50 rounded-[48px] w-24 h-24 ${marginP ? 'w-32' : 'w-24'} ml-6 my-4 flex items-center justify-left duration-200 shadow-2xl transition-background hover:cursor-pointer`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseEnter}
                onClick={onClick}>
                <div className='ml-7'>{children}</div>
            </div>
        )
    }
    return (
        <div className='bg-white mx-6 my-4 h-24 rounded-[48px] shadow-xl hover:scale-[1.01] px-8 py-4 rounded-md flex items-center justify-left gap-5 hover:cursor-pointer transition-all'
            onClick={onClick}>
            {children}
        </div>
    )
}

export default SidebarButton