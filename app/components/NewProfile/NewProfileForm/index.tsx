import styles from './NewProfileForm.module.scss'
import { useState } from 'react'
import Field from './Field'

const NewProfileForm = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [motto, setMotto] = useState<string>('')

  return (
    <div className={styles.container}>
      <div className={styles.helperWrapper}>
        <h1 className={styles.title}>New profile</h1>
        <form className={styles.form}>
          <Field placeholder="Teemu" value={firstName} setValue={setFirstName} label="First name" />
          <Field placeholder="Teekkari" value={lastName} setValue={setLastName} label="Last name" />
          <Field placeholder="Teksa" value={nickname} setValue={setNickname} label="Nickname" />
          <Field
            placeholder="Ei tänään, eikä huomenna."
            value={motto}
            setValue={setMotto}
            label="Motto"
          />
        </form>
      </div>
    </div>
  )
}

export default NewProfileForm
