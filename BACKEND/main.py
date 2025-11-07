from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import chat, risk, coach  # ← incluir coach

app = FastAPI(
    title="Tutor Virtual IA",
    description="API educativa basada en IA con chat, riesgo y coach personal.",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/ping")
def ping():
    return {"message": "pong"}

@app.post("/predict")
def predict(data: dict):
    return {"result": "ejemplo recibido", "data": data}

app.include_router(chat.router)
app.include_router(risk.router)
app.include_router(coach.router)  # ← nuevo endpoint

@app.get("/")
def root():
    return {"message": "Tutor Virtual con Coach funcionando correctamente 🚀"}
