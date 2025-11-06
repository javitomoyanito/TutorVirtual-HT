from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_coaching_plan(student_data: dict):
    """Genera un plan educativo usando ChatGPT."""
    prompt = f"""
    Eres un tutor educativo. Basado en estos datos:
    {student_data}

    Devuelve un plan breve de mejora académica y menciona
    dos referencias de una base de conocimiento /kb.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Eres un tutor académico experto en aprendizaje personalizado."},
            {"role": "user", "content": prompt}
        ]
    )

    plan = response.choices[0].message.content
    return {"plan": plan, "kb_refs": ["/kb/matematicas_basicas", "/kb/habitos_estudio"]}
