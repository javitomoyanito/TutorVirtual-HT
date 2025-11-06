# FastAPI endpoints: /predict, /coach y /predict_risk
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_student_performance
from coach import generate_coaching_plan
from typing import Any, Dict

# ✅ Nuevo: motor de riesgo
from src.risk_model import predict_risk

app = FastAPI(title="Hackathon Educación API")

# Habilitar CORS (para integrar con el front)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar luego por el dominio del front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de entrada
class PredictRequest(BaseModel):
    student_id: str
    data: dict

class CoachRequest(BaseModel):
    student_id: str
    data: dict

# ✅ Modelo para el riesgo (se admiten valores opcionales)
class RiskInput(BaseModel):
    GEN_ALU: str | None = None
    EDAD_ALU: float | None = None
    COD_ENSE2: int | None = None
    COD_GRADO2: int | None = None
    COD_JOR: int | None = None
    TASA_ASISTENCIA_ANUAL: float | None = None
    PROM_GRAL: float | None = None
    PROM_GRAL_PCT: float | None = None
    CATEGORIA_ASIS_ANUAL: str | None = None


# ✅ Existing endpoints
@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        result = predict_student_performance(request.data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/coach")
async def coach(request: CoachRequest):
    try:
        result = generate_coaching_plan(request.data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ Nuevo endpoint: Motor de Riesgo (acepta plano o {"data": {...}})
@app.post("/predict_risk")
async def api_predict_risk(payload: Dict[str, Any] = Body(...)):
    try:
        result = predict_risk(payload)  # risk_model ya desenrolla si viene {"data": {...}}
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/")
def root():
    return {"status": "ok", "service": "Hackathon Educación API"}

@app.get("/health")
def health():
    return {"status": "ok"}

