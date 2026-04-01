from dotenv import load_dotenv

load_dotenv()  # Must run before any service module imports the OpenAI client

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import transcribe, chat, speak, summary

app = FastAPI(title="Screening Bot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transcribe.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(speak.router, prefix="/api")
app.include_router(summary.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
