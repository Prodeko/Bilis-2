import type { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  to: string,
  children: JSX.Element
}



const SidebarButton: NextPage<Props> = ({to, children}) => {
  return(
    <Link href={to} passHref={true}>
      <div className="bg-gray-100 rounded-full w-28 h-28 mx-auto my-4 flex items-center justify-center duration-1000 shadow-2xl transition-transform hover:cursor-pointer hover:rounded-3xl">
        {children}
      </div>
    </Link>
  )
}

export default SidebarButton