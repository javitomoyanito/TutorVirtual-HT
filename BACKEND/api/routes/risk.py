from fastapi import APIRouter
from src.risk_model import predict_risk  # Importamos la función desde src

router = APIRouter(prefix="/risk", tags=["Riesgo"])

@router.post("/")
def evaluar_riesgo(payload: dict):
    """
    Evalúa el riesgo de deserción según los datos enviados por el frontend.
    """
    resultado = predict_risk(payload)
    return resultado

@router.get("/test")
def test_riesgo():
    """
    Endpoint de prueba: envía un ejemplo mínimo.
    """
    ejemplo = {
        "Asistencia": 0.8,
        "Promedio": 5.5,
        "Tasa_Desercion_Global": 0.2
    }
    return predict_risk(ejemplo)
