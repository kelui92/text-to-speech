from fastapi import APIRouter, UploadFile, File, HTTPException
from src.services import openai_stt

router = APIRouter()


@router.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    if not audio.content_type or "audio" not in audio.content_type:
        raise HTTPException(status_code=400, detail="File must be an audio file")

    audio_bytes = await audio.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Audio file is empty")

    text = await openai_stt.transcribe(audio_bytes, audio.filename or "audio.webm")
    return {"text": text}
