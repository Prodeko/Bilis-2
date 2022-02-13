import type { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  to: string,
  children: JSX.Element
}



const SidebarButton: NextPage<Props> = ({ to, children }) => {

  return (
    <Link href={to} passHref={true}>
      <div className={`bg-cover bg-gray-100 hover:bg-prodekoBtn bg-contain rounded-[48px] hover:rounded-[36px] w-24 h-24 ml-6 my-4 flex items-center justify-center duration-200 shadow-2xl transition-all hover:cursor-pointer hover:duration-200`}>
        {children}
      </div>
    </Link>
  )
}

export default SidebarButton