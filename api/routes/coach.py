from fastapi import APIRouter
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os

router = APIRouter(prefix="/coach", tags=["Coach"])

# Cargar variables de entorno
load_dotenv(find_dotenv(), override=True)

def _mask(s: str) -> str:
    if not s:
        return "<EMPTY>"
    if len(s) <= 10:
        return s[:2] + "..." + s[-2:]
    return s[:6] + "..." + s[-6:]

def _get_openai_client():
    raw = os.getenv("OPENAI_API_KEY", "")
    key = raw.strip().strip('"').strip("'")
    if key.endswith("."):
        key = key[:-1]

    print(f"[coach] OPENAI_API_KEY(masked) = {_mask(key)}")

    if not key or not key.startswith("sk-"):
        raise RuntimeError("OPENAI_API_KEY ausente o con formato inválido (no empieza con 'sk-').")

    return OpenAI(api_key=key)

client = _get_openai_client()

def generate_coaching_plan(student_data: dict):
    """Genera un plan educativo usando OpenAI."""
    prompt = f"""
Eres un tutor educativo. Basado en estos datos del/la estudiante:
{student_data}

Devuelve un plan breve y accionable de mejora académica (bullets), teniendo en cuenta las capacidades y estado emocional.
Incluye también 2 recomendaciones prácticas provenientes de /kb (por ejemplo: /kb/matematicas_basicas o /kb/habitos_estudio).
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Eres un tutor virtual educativo y empático llamado 'Solari'. "
                        "Tu misión es acompañar a los estudiantes en su aprendizaje y bienestar mental. "
                        "Usa un lenguaje cálido, tranquilo y alentador. "
                        "Evita tecnicismos, fomenta la autoconfianza y el equilibrio personal."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.4,
        )
        plan = response.choices[0].message.content
        return {"plan": plan, "kb_refs": ["/kb/matematicas_basicas", "/kb/habitos_estudio"]}
    except Exception as e:
        err_text = str(e)
        if "401" in err_text or "invalid_api_key" in err_text:
            return {
                "error": "OpenAI devolvió 401: API key inválida o mal leída.",
                "tips": [
                    "Verifica que la key no tenga punto final ni comillas en .env",
                    "Prueba exportarla en la consola: export OPENAI_API_KEY='sk-...'",
                    "Genera una nueva key en el panel si el problema persiste",
                ],
            }
        return {"error": f"No se pudo generar el plan: {e}"}

@router.post("/")
async def generar_plan(payload: dict):
    """Endpoint público /coach"""
    return generate_coaching_plan(payload)
