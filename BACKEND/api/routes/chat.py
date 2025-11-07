from fastapi import APIRouter
from api.services.openai_service import generar_respuesta
from src.risk_model import predict_risk
import re

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/")
async def chat_endpoint(payload: dict):
    mensaje = payload.get("message", "").lower().strip()

    # --- Detección de frases con asistencia/promedio ---
    asistencia_match = re.search(r"asistencia\s*[:=]?\s*(\d+(?:\.\d+)?)", mensaje)
    promedio_match = re.search(r"promedio\s*[:=]?\s*(\d+(?:\.\d+)?)", mensaje)

    if asistencia_match and promedio_match:
        asistencia = float(asistencia_match.group(1))
        promedio = float(promedio_match.group(1))
        tasa = 0.2  # valor fijo por ahora

        try:
            resultado = predict_risk({
                "Asistencia": asistencia,
                "Promedio": promedio,
                "Tasa_Desercion_Global": tasa
            })
            prob = round(resultado["probabilidad"] * 100, 2)
            nivel = (
                "alto ⚠️" if prob >= 70
                else "medio 🟡" if prob >= 40
                else "bajo 🟢"
            )

            return {
                "response": f"📊 Con una asistencia de {asistencia} y promedio de {promedio}, "
                            f"tu probabilidad de deserción es {prob}%. Nivel de riesgo {nivel}."
            }

        except Exception as e:
            return {"response": f"⚠️ No pude calcular tu riesgo: {str(e)}"}

    # --- Si no es un mensaje de riesgo, se responde con OpenAI ---
    try:
        respuesta = generar_respuesta(mensaje)
        return {"response": respuesta}
    except Exception as e:
        return {"response": f"❌ Error al conectar con el modelo: {str(e)}"}
