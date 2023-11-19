'use client'

import React from 'react'

import styles from './Season.module.scss'

const SeasonForm: React.FC = () => {
  const [message, setMessage] = React.useState('')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const seasonData = {
      name: formData.get('name'),
      start: formData.get('start'),
      end: formData.get('end'),
    }
    fetch('/api/season', {
      method: 'POST',
      body: JSON.stringify(seasonData),
    }).then(async res => {
      if (res.ok) {
        setMessage('Season added successfully')
        return res.json()
      } else {
        const error = await res.json()
        setMessage(`Error adding season: ${error.message}`)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.message}>{message}</p>
      <input
        type="text"
        name="name"
        placeholder="Season Name (optional)"
        className={styles.inputField}
      />
      <input type="date" name="start" className={styles.inputField} />
      <input type="date" name="end" className={styles.inputField} />
      <button type="submit" className={styles.submitButton}>
        Add Season
      </button>
    </form>
  )
}

export default SeasonForm
