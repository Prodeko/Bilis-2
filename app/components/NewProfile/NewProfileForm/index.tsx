import styles from './NewProfileForm.module.scss'
import { useState } from 'react'
import Field from './Field'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useRouter } from 'next/router'

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
    router.push('/player/' + res.data.id)
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
      <div className={styles.helperWrapper}>
        <h1 className={styles.title}>New profile</h1>
        <form className={styles.form}>
          <div className={styles.fields}>
            <Field
              placeholder="Teemu"
              value={firstName}
              setValue={setFirstName}
              label="First name"
            />
            <Field
              placeholder="Teekkari"
              value={lastName}
              setValue={setLastName}
              label="Last name"
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
              onEmojiClick={emoji => {
                setEmoji(emoji.emoji)
                setEmojiSelectorOpen(false)
              }}
              height={280}
              width={280}
              previewConfig={{ showPreview: false }}
            />
          ) : (
            <div onClick={() => setEmojiSelectorOpen(true)} className={styles.emojiCircle}>
              {emoji === '' ? '?' : emoji}
            </div>
          )}
        </form>
        <button
          className={`${styles.button} ${isValid ? styles.buttonActive : styles.buttonInactive}`}
          onClick={submitNewPlayer}
        >
          Create player
          <BsFillPersonPlusFill className={styles.icon} />
        </button>
      </div>
    </div>
  )
}

export default NewProfileForm
