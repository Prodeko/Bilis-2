type TitleName = {
  titleName: string
}

const MainTitle = ({ titleName }: TitleName): JSX.Element => {
  return <h2 className="pb-4 text-6xl">{titleName}</h2>
}

export default MainTitle
