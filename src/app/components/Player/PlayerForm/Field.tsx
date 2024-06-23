interface FieldProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  label: string;
}

export const Field = ({ value, setValue, placeholder, label }: FieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col-reverse gap-1">
      <input
        id={label}
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={handleChange}
        className="peer rounded-md border-none px-5 py-3 text-neutral-700 transition-all duration-200 placeholder:text-neutral-400 focus:outline-2 focus:outline-primary-300 focus:ring-0"
      />
      <label
        htmlFor={label}
        className="cursor-pointer self-start text-base font-medium text-primary-200 transition-all duration-200 hover:text-primary-100  peer-focus:text-neutral-50"
      >
        {label}
      </label>
    </div>
  );
};
