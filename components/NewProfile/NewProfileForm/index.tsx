import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'

import { NewPlayer, Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'

import Field from './Field'
import styles from './NewProfileForm.module.scss'

type Props = {
  player?: Player
}

type SubmitPlayerData = Omit<NewPlayer, 'elo'>

const NewProfileForm = ({ player }: Props) => {
  const isUpdate = player !== undefined

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [motto, setMotto] = useState<string>('')
  const [emoji, setEmoji] = useState<string>('')
  const [emojiSelectorOpen, setEmojiSelectorOpen] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (isUpdate) {
      setFirstName(player.firstName)
      setLastName(player.lastName)
      setNickname(player.nickname)
      setMotto(player.motto)
      setEmoji(player.emoji)
    }
  }, [player, isUpdate])

  const updatePlayer = (id: number) => async (data: SubmitPlayerData) => {
    const res = await axios.put(`${NEXT_PUBLIC_API_URL}/player/${id}`, data)
    router.push(`/player/${res.data.id}`)
  }

  const submitNewPlayer = async (data: SubmitPlayerData) => {
    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/player`, data)
    router.push(`/player/${res.data.id}`)
  }

  const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const updateFunc = isUpdate ? updatePlayer(player.id) : submitNewPlayer
    updateFunc({
      firstName,
      lastName,
      nickname,
      motto,
      emoji,
    })
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
          onClick={submit}
        >
          Create player
          <BsFillPersonPlusFill className={styles.icon} />
        </button>
      </form>
    </div>
  )
}

NewProfileForm.defaultProps = {
  player: undefined,
}

export default NewProfileForm
