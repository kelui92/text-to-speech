import axios from 'axios'
import { transcribeAudio, getAIResponse, textToSpeech, getIndustries } from '@/lib/api'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockApi = {
  post: jest.fn(),
  get: jest.fn(),
}

jest.mock('axios', () => ({
  create: jest.fn(() => mockApi),
}))

describe('api', () => {
  beforeEach(() => jest.clearAllMocks())

  it('transcribeAudio sends FormData and returns text', async () => {
    mockApi.post.mockResolvedValueOnce({ data: { text: 'hello world' } })
    const blob = new Blob(['audio'], { type: 'audio/webm' })
    const result = await transcribeAudio(blob)
    expect(result).toBe('hello world')
    expect(mockApi.post).toHaveBeenCalledWith('/api/transcribe', expect.any(FormData))
  })

  it('getAIResponse sends industry and messages', async () => {
    mockApi.post.mockResolvedValueOnce({ data: { response: 'Tell me more.' } })
    const result = await getAIResponse('technology', [])
    expect(result).toBe('Tell me more.')
    expect(mockApi.post).toHaveBeenCalledWith('/api/chat', {
      industry: 'technology',
      messages: [],
    })
  })

  it('textToSpeech returns ArrayBuffer', async () => {
    const fakeBuffer = new ArrayBuffer(8)
    mockApi.post.mockResolvedValueOnce({ data: fakeBuffer })
    const result = await textToSpeech('Hello')
    expect(result).toBe(fakeBuffer)
  })

  it('getIndustries returns list', async () => {
    mockApi.get.mockResolvedValueOnce({ data: { industries: ['finance', 'technology'] } })
    const result = await getIndustries()
    expect(result).toEqual(['finance', 'technology'])
  })
})
