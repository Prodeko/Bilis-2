'use client'

// Error components must be Client Components
import { useEffect } from 'react'

import styles from './Error.module.scss'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className={styles.container}>
      <div className={styles.textcontainer}>
        <h1 className={styles.title}>Something went wrong!</h1>
        <span className={styles.message}>{error.message}</span>
      </div>
      <button
        className={styles.button}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

export const dynamic = 'force-dynamic'
