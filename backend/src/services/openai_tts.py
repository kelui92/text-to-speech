from openai import AsyncOpenAI

client = AsyncOpenAI()


async def speak(text: str, voice: str = "alloy") -> bytes:
    response = await client.audio.speech.create(
        model="tts-1",
        voice=voice,
        input=text,
    )
    return response.content
