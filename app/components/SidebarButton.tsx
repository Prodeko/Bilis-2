import type { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  to: string,
  children: JSX.Element
}



const SidebarButton: NextPage<Props> = ({to, children}) => {
  return(
    <Link href={to} passHref={true}>
      <div className="bg-gray-100 hover:bg-blue-50 rounded-[48px] hover:rounded-[42px] w-24 h-24 hover:w-28 hover:h-28 mx-auto my-4 flex items-center justify-center duration-200 shadow-2xl transition-background hover:cursor-pointer">
        {children}
      </div>
    </Link>
  )
}

export default SidebarButton