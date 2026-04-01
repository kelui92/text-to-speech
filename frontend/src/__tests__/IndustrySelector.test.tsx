import { render, screen, fireEvent } from '@testing-library/react'
import IndustrySelector from '@/components/IndustrySelector'

describe('IndustrySelector', () => {
  it('renders the heading', () => {
    render(<IndustrySelector onStart={jest.fn()} isLoading={false} />)
    expect(screen.getByText('Expert Screening Bot')).toBeInTheDocument()
  })

  it('renders all industry options', () => {
    render(<IndustrySelector onStart={jest.fn()} isLoading={false} />)
    expect(screen.getByRole('option', { name: 'Finance' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Technology' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Healthcare' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Legal' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Engineering' })).toBeInTheDocument()
  })

  it('calls onStart with selected industry on submit', () => {
    const onStart = jest.fn()
    render(<IndustrySelector onStart={onStart} isLoading={false} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'technology' } })
    fireEvent.submit(screen.getByRole('button'))
    expect(onStart).toHaveBeenCalledWith('technology')
  })

  it('disables button when isLoading', () => {
    render(<IndustrySelector onStart={jest.fn()} isLoading={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveTextContent('Starting session...')
  })
})
