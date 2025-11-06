# FastAPI endpoints: /predict y /coach
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_student_performance
from coach import generate_coaching_plan

app = FastAPI(title="Hackathon Educación API")

# Habilitar CORS (para integrar con el front)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia luego por el dominio del front
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

# Endpoint /predict
@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        result = predict_student_performance(request.data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint /coach
@app.post("/coach")
async def coach(request: CoachRequest):
    try:
        result = generate_coaching_plan(request.data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
