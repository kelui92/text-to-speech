from openai import AsyncOpenAI
from src.prompts.loader import get_system_prompt

client = AsyncOpenAI()


async def get_response(
    messages: list[dict],
    industry: str,
    custom_questions: list[str] | None = None,
) -> str:
    system_prompt = get_system_prompt(industry, custom_questions)
    full_messages = [{"role": "system", "content": system_prompt}] + messages
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=full_messages,
        max_tokens=300,
    )
    return response.choices[0].message.content
