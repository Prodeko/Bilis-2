import React from 'react'
import styles from './Field.module.scss'

interface FieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
  label: string
}

const Field = ({ value, setValue, placeholder, label }: FieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  )
}

export default Field
