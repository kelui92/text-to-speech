import pytest
from unittest.mock import AsyncMock, MagicMock, patch


@pytest.mark.asyncio
async def test_get_response_returns_content():
    mock_response = MagicMock()
    mock_response.choices[0].message.content = "Tell me about your experience."

    with patch("src.services.openai_chat.client") as mock_client:
        mock_client.chat.completions.create = AsyncMock(return_value=mock_response)

        from src.services.openai_chat import get_response
        result = await get_response([], "technology")

        assert result == "Tell me about your experience."


@pytest.mark.asyncio
async def test_get_response_includes_system_prompt_first():
    mock_response = MagicMock()
    mock_response.choices[0].message.content = "Question here."

    with patch("src.services.openai_chat.client") as mock_client:
        mock_client.chat.completions.create = AsyncMock(return_value=mock_response)

        from src.services.openai_chat import get_response
        await get_response([{"role": "user", "content": "Hello"}], "finance")

        call_args = mock_client.chat.completions.create.call_args
        messages = call_args.kwargs["messages"]
        assert messages[0]["role"] == "system"


@pytest.mark.asyncio
async def test_get_response_passes_user_messages():
    mock_response = MagicMock()
    mock_response.choices[0].message.content = "Follow-up question."

    with patch("src.services.openai_chat.client") as mock_client:
        mock_client.chat.completions.create = AsyncMock(return_value=mock_response)

        from src.services.openai_chat import get_response
        user_messages = [
            {"role": "assistant", "content": "What is your background?"},
            {"role": "user", "content": "I have 10 years in finance."},
        ]
        await get_response(user_messages, "finance")

        call_args = mock_client.chat.completions.create.call_args
        messages = call_args.kwargs["messages"]
        assert len(messages) == 3  # system + 2 user messages
