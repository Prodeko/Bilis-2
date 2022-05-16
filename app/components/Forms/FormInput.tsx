type InputProps = { value: string; placeholder: string; handleChange: (value: string) => void }

const FormInput = ({ value, placeholder, handleChange }: InputProps) => {
  return (
    <div className="border-b-4 border-prodekoBlue w-full bg-white shadow-xl justify-self-center">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-500 py-10 leading-tight focus:outline-none px-5 text-2xl"
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={event => handleChange(event.target.value)}
      />
    </div>
  )
}

export default FormInput
