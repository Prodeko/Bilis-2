import { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { NewPlayer, Player, PlayerWithStats } from '../../common/types'
import FormInput from '../../components/Forms/FormInput'

const AddPlayer: NextPage = () => {
  const [player, setPlayer] = useState<NewPlayer>({
    firstName: '',
    lastName: '',
    nickname: '',
    emoji: '',
    favoriteColor: '',
  })

  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (err: string) => {
    setNotification(err)
    setTimeout(() => setNotification(null), 2500)
  }

  const setKey = (key: keyof NewPlayer) => (value: string) => {
    setPlayer(() => ({ ...player, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { ok } = await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    })

    if (ok) {
      showNotification('Pelaaja luotu.')
    } else {
      showNotification('Jokin meni pieleen. Tarkista kentät.')
    }
  }

  return (
    <form className="w-full flex align-center py-20 justify-center" onSubmit={handleSubmit}>
      <div className="w-1/3 shadow-xl bg-gray-100 rounded-md border-gray-200 p-10 border grid grid-cols-1 gap-10">
        <h2 className="p-8">Lisää pelaaja</h2>
        <FormInput
          value={player.firstName}
          handleChange={setKey('firstName')}
          placeholder="Etunimi"
        />
        <FormInput
          value={player.lastName}
          handleChange={setKey('lastName')}
          placeholder="Sukunimi"
        />
        <FormInput value={player.nickname} handleChange={setKey('nickname')} placeholder="Nick" />
        <FormInput value={player.emoji} handleChange={setKey('emoji')} placeholder="Emoji" />
        <FormInput
          value={player.favoriteColor}
          handleChange={setKey('favoriteColor')}
          placeholder="Lemppari väri"
        />
        <button className="w-full bg-prodekoBlue h-24 text-white text-2xl">Luo pelaaja</button>
        {notification && <h3 className="p-6">{notification}</h3>}
      </div>
    </form>
  )
}

export default AddPlayer
