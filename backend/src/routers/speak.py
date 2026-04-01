from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from src.services import openai_tts

router = APIRouter()

VALID_VOICES = {"alloy", "echo", "fable", "onyx", "nova", "shimmer"}


class SpeakRequest(BaseModel):
    text: str
    voice: str = "alloy"


@router.post("/speak")
async def speak(request: SpeakRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if request.voice not in VALID_VOICES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid voice. Choose from: {', '.join(sorted(VALID_VOICES))}",
        )

    audio_bytes = await openai_tts.speak(request.text, request.voice)
    return Response(content=audio_bytes, media_type="audio/mpeg")
