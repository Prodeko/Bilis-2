import { NextPage } from 'next'

interface Props {
  middleColumn: string
}

const HeaderRow: NextPage<Props> = ({ middleColumn }) => {
  return (
    <div className={`w-full grid grid-cols-headerRow justify-center`}>
      <p className="flex justify-center items-center font-bold text-green-700">Voittaja</p>
      <p className="flex justify-center items-center font-bold text-slate-700 text-sm">
        {middleColumn}
      </p>
      <p className="flex justify-center items-center font-bold text-red-700">Häviäjä</p>
    </div>
  )
}

export default HeaderRow
