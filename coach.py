from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os

# Cargar .env de forma robusta y sobrescribir variables si ya existen
load_dotenv(find_dotenv(), override=True)

def _mask(s: str) -> str:
    if not s:
        return "<EMPTY>"
    if len(s) <= 10:
        return s[:2] + "..." + s[-2:]
    return s[:6] + "..." + s[-6:]

def _get_openai_client():
    raw = os.getenv("OPENAI_API_KEY", "")
    key = raw.strip().strip('"').strip("'")  # quita comillas/espacios
    if key.endswith("."):
        key = key[:-1]  # quita punto final accidental

    # Log en consola (enmascarado) para depurar lectura
    print(f"[coach] OPENAI_API_KEY(masked) = { _mask(key) }")

    if not key or not key.startswith("sk-"):
        raise RuntimeError("OPENAI_API_KEY ausente o con formato inválido (no empieza con 'sk-').")

    # Si usas organización/proyecto, puedes habilitar:
    # org_id = os.getenv("OPENAI_ORG_ID")  # opcional
    # project = os.getenv("OPENAI_PROJECT")  # opcional
    # return OpenAI(api_key=key, organization=org_id, project=project)

    return OpenAI(api_key=key)

client = _get_openai_client()

def generate_coaching_plan(student_data: dict):
    """Genera un plan educativo usando OpenAI."""
    prompt = f"""
Eres un tutor educativo. Basado en estos datos del/la estudiante:
{student_data}

Devuelve un plan breve y accionable de mejora académica (bullets), 
con 2 recomendaciones de /kb que suenen verosímiles (p. ej. /kb/matematicas_basicas, /kb/habitos_estudio).
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un tutor académico experto en aprendizaje personalizado."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
        )
        plan = response.choices[0].message.content
        return {"plan": plan, "kb_refs": ["/kb/matematicas_basicas", "/kb/habitos_estudio"]}

    except Exception as e:
        # Si es 401, deja un tip directo
        err_text = str(e)
        if "401" in err_text or "invalid_api_key" in err_text:
            return {
                "error": "OpenAI devolvió 401: API key inválida o mal leída.",
                "tips": [
                    "Verifica que la key no tenga punto final ni comillas en .env",
                    "Prueba exportarla en la consola: $env:OPENAI_API_KEY='sk-...'",
                    "Genera una nueva key en el panel si la duda persiste"
                ]
            }
        return {"error": f"No se pudo generar el plan: {e}"}
