import { render, screen } from '@testing-library/react'
import VoiceRecorder from '@/components/VoiceRecorder'

describe('VoiceRecorder', () => {
  it('renders hold-to-speak button', () => {
    render(<VoiceRecorder onTranscript={jest.fn()} disabled={false} />)
    expect(screen.getByRole('button', { name: /hold to speak/i })).toBeInTheDocument()
  })

  it('disables button when disabled prop is true', () => {
    render(<VoiceRecorder onTranscript={jest.fn()} disabled={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows correct label text when not recording', () => {
    render(<VoiceRecorder onTranscript={jest.fn()} disabled={false} />)
    expect(screen.getByText('Hold to speak')).toBeInTheDocument()
  })
})
