import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'

import { NEXT_PUBLIC_API_URL } from '@config/index'

import Field from './Field'
import styles from './NewProfileForm.module.scss'

const NewProfileForm = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [motto, setMotto] = useState<string>('')
  const [emoji, setEmoji] = useState<string>('')
  const [emojiSelectorOpen, setEmojiSelectorOpen] = useState<boolean>(false)

  const router = useRouter()

  const submitNewPlayer = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/player`, {
      firstName,
      lastName,
      nickname,
      motto,
      emoji,
    })
    router.push(`/player/${res.data.id}`)
  }

  const isValid =
    firstName !== '' &&
    lastName !== '' &&
    nickname !== '' &&
    motto !== '' &&
    emoji !== '' &&
    emojiSelectorOpen === false

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Profile</h1>
      <form className={styles.form}>
        <div className={styles.formInputs}>
          <div className={styles.fields}>
            <Field
              placeholder="Teemu"
              value={firstName}
              setValue={setFirstName}
              label="First Name"
            />
            <Field
              placeholder="Teekkari"
              value={lastName}
              setValue={setLastName}
              label="Last Name"
            />
            <Field placeholder="Teksa" value={nickname} setValue={setNickname} label="Nickname" />
            <Field
              placeholder="Ei tänään, eikä huomenna."
              value={motto}
              setValue={setMotto}
              label="Motto"
            />
          </div>
          {emojiSelectorOpen ? (
            <EmojiPicker
              onEmojiClick={e => {
                setEmoji(e.emoji)
                setEmojiSelectorOpen(false)
              }}
              height={280}
              width={280}
              previewConfig={{ showPreview: false }}
            />
          ) : (
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => setEmojiSelectorOpen(true)}
              onClick={() => setEmojiSelectorOpen(true)}
              className={styles.emojiCircle}
            >
              {emoji === '' ? '?' : emoji}
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={!isValid}
          className={`${styles.button} ${isValid ? styles.buttonActive : styles.buttonInactive}`}
          onClick={submitNewPlayer}
        >
          Create player
          <BsFillPersonPlusFill className={styles.icon} />
        </button>
      </form>
    </div>
  )
}

export default NewProfileForm
