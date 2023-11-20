'use client'

import React from 'react'

import styles from './Season.module.scss'

interface Props {
  id?: number
}

const SeasonForm: React.FC<Props> = ({ id }) => {
  const [message, setMessage] = React.useState('')
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const seasonData = {
      name: formData.get('name'),
      start: formData.get('start'),
      end: formData.get('end'),
    }
    fetch(`/api/season/${id}`, {
      method: 'PUT',
      body: JSON.stringify(seasonData),
    }).then(async res => {
      if (res.ok) {
        setMessage('Season updated successfully')
        window.location.reload()
        return res.json()
      } else {
        setMessage(`Error updating season`)
      }
    })
  }

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
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
        const error = (await res.json()) as { message: string }
        setMessage(`Error adding season: ${error.message}`)
      }
    })
  }

  return (
    <form onSubmit={id ? handleUpdate : handleCreate} className={styles.form}>
      {message && <p className={styles.message}>{message}</p>}
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
