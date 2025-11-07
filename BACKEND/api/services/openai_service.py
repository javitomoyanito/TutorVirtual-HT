import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

# Cargar variables desde .env
# Cargar variables desde .env
load_dotenv(find_dotenv(), override=True)

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("❌ No se encontró OPENAI_API_KEY. Verifica tu archivo .env en BACKEND/.env")

print("🔑 API Key detectada:", api_key[:10], "...")  # Muestra solo los primeros caracteres

# Inicializar cliente OpenAI
client = OpenAI(api_key=api_key)



# Inicializar cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

historial_conversacion = [
    {
        "role": "system",
        "content": (
            "Eres Enrique, un tutor educativo amable, empático y sabio. "
            "Responde en español con tono tranquilo, motivador y humano. "
            "Da respuestas breves, útiles y con ejemplos simples si es necesario."
        ),
    }
]

def generar_respuesta(mensaje: str) -> str:
    """Genera una respuesta amable y educativa del tutor Enrique."""
    try:
        historial_conversacion.append({"role": "user", "content": mensaje})

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=historial_conversacion,
            temperature=0.8,
        )

        respuesta = completion.choices[0].message.content.strip()
        historial_conversacion.append({"role": "assistant", "content": respuesta})
        return respuesta

    except Exception as e:
        return f"⚠️ Ocurrió un error al comunicarse con OpenAI: {e}"

