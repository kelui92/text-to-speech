import json
from openai import AsyncOpenAI

client = AsyncOpenAI()

SUMMARY_PROMPT = """You are reviewing an expert screening conversation.

Analyze the conversation and return a JSON object with exactly these fields:
- "overall": string — 2-3 sentence overall assessment of the candidate
- "strengths": array of strings — specific things they demonstrated well (max 4)
- "gaps": array of strings — areas that were weak, vague, or needed repeated probing (max 4)
- "score": string — one of exactly: "Strong", "Good", "Fair", "Weak"

Base your assessment only on what was said. Be honest and specific."""


async def get_summary(messages: list[dict], industry: str) -> dict:
    conversation_text = "\n".join(
        f"{m['role'].upper()}: {m['content']}" for m in messages
    )
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SUMMARY_PROMPT},
            {
                "role": "user",
                "content": f"Industry: {industry}\n\nConversation:\n{conversation_text}",
            },
        ],
        response_format={"type": "json_object"},
        max_tokens=500,
    )
    return json.loads(response.choices[0].message.content)
