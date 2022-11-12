/* eslint-disable prettier/prettier */
import Router from 'next/router'

import Header from './Header'
import PlayerSearchLink from '@components/utility/PlayerSearch/PlayerSearchLink'
import styles from './SearchContainer.module.scss'

const SearchContainer = () => {
  return (
    <div className={styles.searchContainer}>
      <Header />
      <PlayerSearchLink handleSelect={({ id }) => Router.push(`player/${id}`)} />
    </div>
  )
}

export default SearchContainer
