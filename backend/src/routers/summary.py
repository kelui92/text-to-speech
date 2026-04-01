from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.services import openai_summary
from src.prompts.loader import get_available_industries

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class SummaryRequest(BaseModel):
    industry: str
    messages: list[Message]


@router.post("/summary")
async def summarize(request: SummaryRequest):
    if request.industry not in get_available_industries():
        raise HTTPException(status_code=400, detail=f"Unknown industry: {request.industry}")

    if len(request.messages) < 2:
        raise HTTPException(status_code=400, detail="Not enough conversation to summarize")

    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    result = await openai_summary.get_summary(messages, request.industry)
    return result
