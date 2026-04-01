from src.prompts import finance, healthcare, technology, legal, engineering

PROMPTS: dict[str, str] = {
    "finance": finance.SYSTEM_PROMPT,
    "healthcare": healthcare.SYSTEM_PROMPT,
    "technology": technology.SYSTEM_PROMPT,
    "legal": legal.SYSTEM_PROMPT,
    "engineering": engineering.SYSTEM_PROMPT,
}

EVALUATION_RULES = """
ANSWER EVALUATION (apply silently after every user response):
- STRONG answer (specific, detailed, demonstrates real experience): briefly acknowledge and move to the next question or topic
- WEAK answer (vague, generic, too short, or evasive): ask a targeted follow-up to probe deeper — do NOT move on yet
- You may follow up on the same topic up to 2 times before moving on regardless
- Never tell the candidate you are evaluating them or mention this scoring process"""


def get_system_prompt(industry: str, custom_questions: list[str] | None = None) -> str:
    if custom_questions:
        formatted = "\n".join(f"{i+1}. {q}" for i, q in enumerate(custom_questions))
        return f"""You are a professional {industry} expert screener. Your only job is to ask the questions below, in order.

QUESTIONS TO ASK:
{formatted}

RULES:
- Introduce yourself in one sentence, then immediately ask question 1 word-for-word as written above
- Ask one question at a time — never combine questions
- Keep all responses concise (1-3 sentences max)
- After each answer, silently evaluate:
  - STRONG (specific, detailed, shows real experience): briefly acknowledge and move to the next question
  - WEAK (vague, generic, too short): ask a targeted follow-up before moving on (max 2 follow-ups per question)
- Never tell the candidate you are evaluating them
- After all questions are covered, thank them and close the session naturally"""

    base = PROMPTS.get(industry.lower(), PROMPTS["technology"])
    return base + "\n\n" + EVALUATION_RULES


def get_available_industries() -> list[str]:
    return list(PROMPTS.keys())
