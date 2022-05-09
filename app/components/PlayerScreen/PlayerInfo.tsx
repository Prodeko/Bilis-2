import MainTitle from './MainTitle'
import AttributeLine from './AttributeLine'

type Props = { 
  playerName: string,
  favColor: string,
  nickName: string,
  favBall: string,
}

const ColorBox = (color: string): JSX.Element => {
  return (
    // Color not working, need to remove extra dots
    <div className={`inline-block w-[6rem] h-full border-2 border-black bg-[color:${color}]`}>.</div>
  )
}

const PlayerInfo = ({ playerName, favColor, nickName, favBall }: Props): JSX.Element  => {
  return (
    <div className='p-6'>
      <MainTitle titleName="Pelaajan tiedot" />
      <AttributeLine infoName="Nimi" info={playerName} />
      <AttributeLine infoName="Väri" info={ColorBox(favColor)} />
      <AttributeLine infoName="Lempinimi" info={nickName} />
      <AttributeLine infoName="Lempipallo" info={favBall} />
      {/* <AttributeLine infoName="Voittobiisi" info={favBall} /> */}
    </div>
  )
}

export default PlayerInfo