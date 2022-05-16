import type { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  to: string,
  children: JSX.Element
}



const SidebarButton: NextPage<Props> = ({ to, children }) => {

  return (
    <Link href={to} passHref={true}>
      <div className={`bg-gray-100 bg-contain rounded-[48px] h-24 w-24 flex items-center justify-center shadow-2xl hover:bg-prodekoBtn hover:cursor-pointer hover:rounded-[36px] duration-300`}>
        {children}
      </div>
    </Link>
  )
}

export default SidebarButton