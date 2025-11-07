import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

# Cargar .env
load_dotenv(find_dotenv(), override=True)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generar_respuesta(mensaje: str) -> str:
    prompt = f"Eres un tutor educativo amable y sabio. Responde en español de forma motivadora: {mensaje}"
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Ocurrió un error al comunicarse con OpenAI: {e}"
