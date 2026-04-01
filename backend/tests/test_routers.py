import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_list_industries():
    response = client.get("/api/industries")
    assert response.status_code == 200
    data = response.json()
    assert "industries" in data
    assert len(data["industries"]) >= 5


def test_chat_unknown_industry_returns_400():
    response = client.post("/api/chat", json={"industry": "nonexistent", "messages": []})
    assert response.status_code == 400


def test_speak_empty_text_returns_400():
    response = client.post("/api/speak", json={"text": "", "voice": "alloy"})
    assert response.status_code == 400


def test_speak_invalid_voice_returns_400():
    response = client.post("/api/speak", json={"text": "Hello", "voice": "bad_voice"})
    assert response.status_code == 400


@patch("src.routers.chat.openai_chat.get_response", new_callable=AsyncMock)
def test_chat_valid_request_returns_response(mock_get_response):
    mock_get_response.return_value = "What is your experience with risk management?"
    response = client.post("/api/chat", json={"industry": "finance", "messages": []})
    assert response.status_code == 200
    assert "response" in response.json()


@patch("src.routers.speak.openai_tts.speak", new_callable=AsyncMock)
def test_speak_valid_request_returns_audio(mock_speak):
    mock_speak.return_value = b"fake-audio-bytes"
    response = client.post("/api/speak", json={"text": "Hello there.", "voice": "alloy"})
    assert response.status_code == 200
    assert response.headers["content-type"] == "audio/mpeg"
