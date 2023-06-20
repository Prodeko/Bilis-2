"use client"

import EmojiPicker from 'emoji-picker-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'

import { NewPlayer, Player, player as playerParser } from '@common/types'
import UserPlus from '@public/images/user-plus-01.svg'

import Field from './Field'
import styles from './PlayerForm.module.scss'

type Props = {
  player?: Player
}


const PlayerForm = ({ player }: Props) => {
  const isUpdate = player !== undefined

  const [playerData, setPlayerData] = useState<NewPlayer>({
    firstName: player ? player.firstName : "",
    lastName: player ? player.lastName : "",
    nickname: player ? player.nickname : "",
    motto: player ? player.motto : "",
    emoji: player ? player.emoji : "",
  })
  const [emojiSelectorOpen, setEmojiSelectorOpen] = useState<boolean>(false)

  const router = useRouter()

  const setPlayerKey = (key: keyof NewPlayer) => (val: unknown) => {
    setPlayerData(p => ({ ...p, [key]: val }))
  }

  const updatePlayer = (id: number) => async (oldPlayer: NewPlayer) => {
    const res = await fetch(`/api/player/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(oldPlayer)
    })
    const data = await res.json()
    const updatedPlayer = playerParser.parse(data)
    router.push(`/player/${updatedPlayer.id}`)
  }

  const submitNewPlayer = async (newPlayer: NewPlayer) => {
    const res = await fetch(`/api/player/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlayer)
    })
    const data = await res.json()
    const parsedPlayer = playerParser.parse(data)
    router.push(`/player/${parsedPlayer.id}`)
  }

  const submit = (event: MouseEvent<HTMLButtonElement>) => {
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
          {isUpdate ? 'Save changes' : 'Create player'}
          <Image src={UserPlus} className={styles.icon} alt="User+ icon" />
        </button>
      </form>
    </div>
  )
}

export default PlayerForm
