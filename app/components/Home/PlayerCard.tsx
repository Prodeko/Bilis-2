type Props = {
  selected?: boolean
  children: JSX.Element[]
}

const PlayerCard = ({ selected, children }: Props): JSX.Element => {
  return (
    <div
      className={`bg-white m-4 shadow-xl hover:scale-[1.01] px-8 py-4 rounded-md flex items-center justify-between gap-5 hover:cursor-pointer transition-all`}
    >
      {children}
    </div>
  )
}

export default PlayerCard
