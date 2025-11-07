import os
import joblib
import json
import numpy as np
import pandas as pd

# ==============================
# CARGA DE MODELO Y THRESHOLD
# ==============================
BASE_DIR = os.path.dirname(__file__)                # → /BACKEND/src
ROOT_DIR = os.path.dirname(BASE_DIR)                # → /BACKEND
ARTIFACTS_DIR = os.path.join(ROOT_DIR, "artifacts") # → /BACKEND/artifacts
MODEL_PATH = os.path.join(ARTIFACTS_DIR, "rf_pipe.joblib")
THRESHOLD_PATH = os.path.join(ARTIFACTS_DIR, "threshold.json")

print(f"[risk] Cargando modelo desde {MODEL_PATH} ...")
model = joblib.load(MODEL_PATH)
print("[risk] Modelo cargado correctamente.")

if os.path.exists(THRESHOLD_PATH):
    with open(THRESHOLD_PATH, "r") as f:
        threshold = json.load(f).get("threshold", 0.5)
else:
    threshold = 0.5

print(f"[risk] Umbral (threshold) actual: {threshold}")


# ==============================
# FUNCIÓN DE PREDICCIÓN
# ==============================
def predict_risk(payload: dict):
    """
    Realiza una predicción de riesgo de deserción basado en los datos del estudiante.
    """
    df_in = pd.DataFrame([payload])

    try:
        proba = float(model.predict_proba(df_in)[0, 1])
    except Exception:
        proba = 1.0  # fallback si el modelo es DummyClassifier de una sola clase

    riesgo = int(proba >= threshold)

    return {
        "probabilidad": round(proba, 3),
        "riesgo": riesgo,
        "umbral": threshold
    }
