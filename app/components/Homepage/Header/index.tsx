import MottoCard from '@components/utility/MottoCard'
import Filter from '@components/utility/Filter'
import Image from 'next/image'
import billiardPic from '../../../public/images/billiard.jpg'
import styles from './Header.module.scss'

const Header = () => {
  // TODO!! Remove hard coding
  const text = 'Jääbelis'
  const author = "Petri 'Raikku' Ranta"

  return (
    <header className={styles.header}>
      <Image
        src={billiardPic}
        alt="Billiard Table"
        objectPosition="0px -1000px"
        layout="fill"
        objectFit="cover"
      />
      <Filter>
        <div className={styles.layout}>
          <h1 className={styles.title}>Biliskilke</h1>
          <MottoCard text={text} author={author} />
        </div>
      </Filter>
    </header>
  )
}

export default Header
