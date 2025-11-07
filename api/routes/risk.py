from fastapi import APIRouter
from src.risk_model import predict_risk

router = APIRouter(prefix="/risk", tags=["Riesgo"])

@router.post("/")
def evaluar_riesgo(payload: dict):
    resultado = predict_risk(payload)
    return resultado
