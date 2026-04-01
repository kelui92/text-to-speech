import pytest
from src.prompts.loader import get_system_prompt, get_available_industries


def test_get_available_industries_returns_all():
    industries = get_available_industries()
    assert "finance" in industries
    assert "healthcare" in industries
    assert "technology" in industries
    assert "legal" in industries
    assert "engineering" in industries


def test_get_system_prompt_returns_string():
    prompt = get_system_prompt("finance")
    assert isinstance(prompt, str)
    assert len(prompt) > 50


def test_get_system_prompt_case_insensitive():
    assert get_system_prompt("technology") == get_system_prompt("TECHNOLOGY")


def test_get_system_prompt_unknown_falls_back_to_technology():
    assert get_system_prompt("unknown") == get_system_prompt("technology")


def test_all_prompts_non_empty():
    for industry in get_available_industries():
        prompt = get_system_prompt(industry)
        assert len(prompt) > 50, f"Prompt for {industry} is too short"
