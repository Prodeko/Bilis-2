type Attributes = {
  infoName: string
  info: number | string | JSX.Element
}

const AttributeLine = ({ infoName, info }: Attributes): JSX.Element => {
  return (
    <h4 className="pl-6 text-3xl text-prodekoBlue">
      <strong>{infoName}: </strong>
      {info}
    </h4>
  )
}

export default AttributeLine
