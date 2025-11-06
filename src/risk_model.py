import os
import json
import joblib
import pandas as pd
from typing import Dict, Any

# -----------------------------
# Rutas absolutas a artifacts
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))            # .../src
ARTIFACTS_DIR = os.path.join(os.path.dirname(BASE_DIR), "artifacts")

PIPE_PATH = os.path.join(ARTIFACTS_DIR, "rf_pipe.joblib")
THR_PATH  = os.path.join(ARTIFACTS_DIR, "threshold.json")

# -----------------------------
# Cargar modelo + threshold
# -----------------------------
pipe = joblib.load(PIPE_PATH)
with open(THR_PATH, "r") as f:
    threshold = json.load(f)["threshold"]

# Preprocesador y columnas esperadas (input antes de OneHot)
pre = pipe.named_steps["prep"]
EXPECTED_COLS = list(pre.feature_names_in_)

# Detectar columnas numéricas vs categóricas desde el ColumnTransformer entrenado
# Asumimos orden [('cat', OHE, cat_cols), ('num', 'passthrough', num_cols)]
cat_cols = []
num_cols = []
for name, trans, cols in pre.transformers_:
    if name == "cat":
        cat_cols = list(cols)
    elif name == "num":
        num_cols = list(cols)

def _normalize_payload(payload: Dict[str, Any]) -> pd.DataFrame:
    """
    Acepta:
      - formato plano: {"GEN_ALU": "...", ...}
      - formato envuelto: {"data": {...}}
    Devuelve un DataFrame con exactamente las columnas que espera el pipe,
    con imputación básica (num=0.0, cat='Desconocido') y casteos.
    """
    # Desenrollar si viene como {"data": {...}}
    if "data" in payload and isinstance(payload["data"], dict):
        payload = payload["data"]

    df = pd.DataFrame([payload])

    # Asegurar todas las columnas esperadas
    for col in EXPECTED_COLS:
        if col not in df.columns:
            df[col] = pd.NA

    # Mantener solo las esperadas y en el orden correcto
    df = df[EXPECTED_COLS]

    # Cast numéricos a float y rellenar NaN con 0.0
    for c in num_cols:
        if c in df.columns:
            df[c] = pd.to_numeric(df[c], errors="coerce")
    df[num_cols] = df[num_cols].fillna(0.0)

    # Categóricas: rellenar NaN con "Desconocido"
    for c in cat_cols:
        if c in df.columns:
            df[c] = df[c].astype("string")
    df[cat_cols] = df[cat_cols].fillna("Desconocido")

    return df

def predict_risk(input_payload: Dict[str, Any]):
    df_in = _normalize_payload(input_payload)
    proba = float(pipe.predict_proba(df_in)[0, 1])
    label = int(proba >= threshold)

    return {
        "score": proba,
        "label": label,
        "threshold": threshold,
        "message": "Riesgo ALTO de deserción ⚠️" if label == 1 else "Riesgo BAJO ✅"
    }
