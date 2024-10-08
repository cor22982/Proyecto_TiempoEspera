import { test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomButton from './CustomButton'

//renderizar un componente 
test('Button renders correctly', () => {
  render(<CustomButton />)
})


test('Renders the text CLICK ME!', () => {
  const { getByText } = render(<CustomButton buttonText="CLICK ME!"/>)
  const element = getByText('CLICK ME!')
  expect(element).toBeInTheDocument()
})


test('Calls the callback function when clicked', () => {
  const spy = vi.fn()
  const { getByText } = render(<CustomButton buttonText="CLICK ME!" onClick={spy} />)
  const element = getByText('CLICK ME!')

  fireEvent.click(element)

  expect(spy).toHaveBeenCalledOnce()
})
