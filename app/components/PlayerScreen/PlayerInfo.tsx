import List from '../List'

type Props = { 
  playerName: string,
  favColor: string,
  nickName: string,
  favBall: string,
}

const colorBox = (color: string) => {
  console.log(color)
  return (
    // Color not working, need to remove extra dots
    <div className={`inline-block w-[6rem] h-full border-2 border-black bg-[color:${color}]`}>.</div>
  )
}

const PlayerInfo = ({ playerName, favColor, nickName, favBall }: Props): JSX.Element  => {
  return (
    <List>
      <div className='box-border h-full p-6'>
        <h2 className='pb-4'>Pelaajan tiedot</h2>
        <h4 className='pl-6'><strong>Nimi: </strong>{playerName}</h4>
        <h4 className='pl-6'><strong>Väri: </strong>{colorBox(favColor)}</h4>
        <h4 className='pl-6'><strong>Lempinimi: </strong>{nickName}</h4>
        <h4 className='pl-6'><strong>Lempipallo: </strong>{favBall}</h4>
        {/* <h4><strong>Voittobiisi: </strong>{playerName}</h4> */}
      </div>
    </List>
  )
}

export default PlayerInfo