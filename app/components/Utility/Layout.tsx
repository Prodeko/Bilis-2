import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../Sidebar/Sidebar'


type Props = {
  children: JSX.Element
}


const Layout: NextPage<Props> = ({ children }) => {
  return(
    <div>
      <Head>
        <title>Biliskilke 2.0</title>
      </Head>
      <Sidebar />
      <div className="ml-36 bg-gray-50 h-screen max-h-screen">
        {children}
      </div> 
    </div>
  )
}

export default Layout