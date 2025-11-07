import os
import json
import joblib
import pandas as pd
from typing import Dict, Any

# ==========================
# Rutas absolutas
# ==========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTIFACTS_DIR = os.path.join(os.path.dirname(BASE_DIR), "artifacts")

PIPE_PATH = os.path.join(ARTIFACTS_DIR, "rf_pipe.joblib")
THR_PATH  = os.path.join(ARTIFACTS_DIR, "threshold.json")

print(f"[risk] Cargando modelo desde {PIPE_PATH} ...")

pipe = joblib.load(PIPE_PATH)
print("[risk] Modelo cargado correctamente.")

with open(THR_PATH, "r") as f:
    threshold = json.load(f)["threshold"]
print(f"[risk] Umbral (threshold) actual: {threshold}")

# ==========================
# Columnas esperadas (manual)
# ==========================
EXPECTED_COLS = ["Asistencia", "Promedio", "Tasa_Desercion_Global"]

def _normalize_payload(payload: Dict[str, Any]) -> pd.DataFrame:
    """
    Normaliza el payload de entrada para que coincida con las columnas del modelo.
    """
    if "data" in payload and isinstance(payload["data"], dict):
        payload = payload["data"]

    df = pd.DataFrame([payload])

    for col in EXPECTED_COLS:
        if col not in df.columns:
            df[col] = pd.NA

    df = df[EXPECTED_COLS]

    # Conversión segura
    df["Asistencia"] = pd.to_numeric(df["Asistencia"], errors="coerce").fillna(0.0)
    df["Promedio"] = pd.to_numeric(df["Promedio"], errors="coerce").fillna(0.0)
    df["Tasa_Desercion_Global"] = pd.to_numeric(df["Tasa_Desercion_Global"], errors="coerce").fillna(0.1)

    return df

# ==========================
# Predicción de riesgo
# ==========================
def predict_risk(input_payload: Dict[str, Any]):
    df_in = _normalize_payload(input_payload)

    # Compatibilidad: si el modelo es Pipeline o modelo directo
    if hasattr(pipe, "predict_proba"):
        proba = float(pipe.predict_proba(df_in)[0, 1])
    else:
        raise RuntimeError("El modelo cargado no tiene método predict_proba")

    label = int(proba >= threshold)

    return {
        "score": round(proba, 4),
        "label": label,
        "threshold": threshold,
        "message": "Riesgo ALTO de deserción ⚠️" if label == 1 else "Riesgo BAJO ✅"
    }
