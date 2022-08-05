const Rainbow = () => {
  return (
    <svg width={0} height={0} aria-hidden="true" focusable="false">
      <linearGradient id="bg-rainbow" x2="1" y2="1">
        <stop offset="5%" stopColor="violet" />
        <stop offset="20%" stopColor="indigo" />
        <stop offset="35%" stopColor="blue" />
        <stop offset="50%" stopColor="green" />
        <stop offset="65%" stopColor="yellow" />
        <stop offset="80%" stopColor="orange" />
        <stop offset="95%" stopColor="red" />
      </linearGradient>
    </svg>
  )
}

export default Rainbow
