from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.services import openai_chat
from src.prompts.loader import get_available_industries

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    industry: str
    messages: list[Message]
    custom_questions: list[str] = []


@router.post("/chat")
async def chat(request: ChatRequest):
    if request.industry not in get_available_industries():
        raise HTTPException(status_code=400, detail=f"Unknown industry: {request.industry}")

    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    response = await openai_chat.get_response(
        messages, request.industry, request.custom_questions or None
    )
    return {"response": response}


@router.get("/industries")
async def list_industries():
    return {"industries": get_available_industries()}
