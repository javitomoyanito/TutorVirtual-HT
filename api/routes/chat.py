from fastapi import APIRouter
from api.services.openai_service import generar_respuesta

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/")
async def chat_endpoint(payload: dict):
    mensaje = payload.get("message", "")
    respuesta = generar_respuesta(mensaje)
    return {"response": respuesta}
