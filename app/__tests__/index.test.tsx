import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('Exampletest', () => {
    render(<Home />)

    const heading = screen.getByText(/Homma pelittää!/i)

    expect(heading).toBeInTheDocument()
  })
})
