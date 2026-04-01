from openai import AsyncOpenAI

client = AsyncOpenAI()


async def transcribe(audio_bytes: bytes, filename: str = "audio.webm") -> str:
    response = await client.audio.transcriptions.create(
        model="whisper-1",
        file=(filename, audio_bytes, "audio/webm"),
    )
    return response.text
