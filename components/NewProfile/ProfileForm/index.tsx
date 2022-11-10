import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'

import { NewPlayer, Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'

import Field from './Field'
import styles from './ProfileForm.module.scss'

type Props = {
  player?: Player
}

type SubmitPlayerData = Omit<NewPlayer, 'elo'>

const ProfileForm = ({ player }: Props) => {
  const isUpdate = player !== undefined

  const [playerData, setPlayerData] = useState<SubmitPlayerData>({
    firstName: '',
    lastName: '',
    nickname: '',
    motto: '',
    emoji: '',
  })
  const [emojiSelectorOpen, setEmojiSelectorOpen] = useState<boolean>(false)

  const router = useRouter()

  const setPlayerKey = (key: keyof SubmitPlayerData) => (val: any) => {
    setPlayerData(p => ({ ...p, [key]: val }))
  }

  useEffect(() => {
    if (isUpdate) {
      setPlayerData(player)
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
    updateFunc(playerData)
  }

  const allFieldsValid = Object.values(playerData).every(v => v !== '')
  const isValid = allFieldsValid && emojiSelectorOpen === false

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isUpdate ? 'Update Profile' : 'New Profile'}</h1>
      <form className={styles.form}>
        <div className={styles.formInputs}>
          <div className={styles.fields}>
            <Field
              placeholder="Teemu"
              value={playerData.firstName}
              setValue={setPlayerKey('firstName')}
              label="First Name"
            />
            <Field
              placeholder="Teekkari"
              value={playerData.lastName}
              setValue={setPlayerKey('lastName')}
              label="Last Name"
            />
            <Field
              placeholder="Teksa"
              value={playerData.nickname}
              setValue={setPlayerKey('nickname')}
              label="Nickname"
            />
            <Field
              placeholder="Ei tänään, eikä huomenna."
              value={playerData.motto}
              setValue={setPlayerKey('motto')}
              label="Motto"
            />
          </div>
          {emojiSelectorOpen ? (
            <EmojiPicker
              onEmojiClick={e => {
                setPlayerKey('emoji')(e.emoji)
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
              {playerData.emoji === '' ? '?' : playerData.emoji}
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={!isValid}
          className={`${styles.button} ${isValid ? styles.buttonActive : styles.buttonInactive}`}
          onClick={submit}
        >
          {isUpdate ? 'Update player' : 'Create player'}
          <BsFillPersonPlusFill className={styles.icon} />
        </button>
      </form>
    </div>
  )
}

ProfileForm.defaultProps = {
  player: undefined,
}

export default ProfileForm