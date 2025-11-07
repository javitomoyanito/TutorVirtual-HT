import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
import json
from sklearn.dummy import DummyClassifier

# -----------------------------
# Configuración
# -----------------------------
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "artifacts")

ASISTENCIA_PATH = os.path.join(DATA_DIR, "Asistencia.csv")
RENDIMIENTO_PATH = os.path.join(DATA_DIR, "Rendimiento.csv")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "rf_pipe.joblib")
THRESHOLD_PATH = os.path.join(ARTIFACTS_DIR, "threshold.json")

# -----------------------------
# Cargar datasets con detección de separador
# -----------------------------
def load_csv(path):
    with open(path, "r", encoding="latin-1") as f:
        sample = f.read(1024)
    sep = ";" if sample.count(";") > sample.count(",") else ","
    print(f"📄 Cargando: {path} (sep='{sep}')")
    return pd.read_csv(path, sep=sep, encoding="latin-1", low_memory=False)

print("📊 Cargando datos...")
asistencia = load_csv(ASISTENCIA_PATH)
rendimiento = load_csv(RENDIMIENTO_PATH)

# -----------------------------
# Normalizar nombres de columnas
# -----------------------------
asistencia.columns = asistencia.columns.str.strip().str.lower()
rendimiento.columns = rendimiento.columns.str.strip().str.lower()

# Detectar columna clave (mrun o MRUN)
if "mrun" in asistencia.columns and "mrun" in rendimiento.columns:
    key = "mrun"
elif "mrun" in asistencia.columns and "mrun".upper() in rendimiento.columns:
    rendimiento.rename(columns={"mrun".upper(): "mrun"}, inplace=True)
    key = "mrun"
else:
    key = None

print(f"🔑 Clave de unión detectada: {key}")

# -----------------------------
# Unir datasets
# -----------------------------
if key:
    df = pd.merge(asistencia, rendimiento, how="inner", on=key)
else:
    print("⚠️ No se encontró clave común, uniendo por índice")
    df = pd.concat([asistencia.reset_index(drop=True), rendimiento.reset_index(drop=True)], axis=1)

print(f"✅ Dataset combinado: {df.shape[0]} filas, {df.shape[1]} columnas")

# -----------------------------
# Crear variables relevantes
# -----------------------------
def safe_get(col):
    for c in df.columns:
        if col in c:
            return df[c]
    return np.nan

df["Asistencia"] = safe_get("tasa_asistencia_anual").fillna(0)
df["Promedio"] = safe_get("prom_gral").fillna(0)
df["Tasa_Desercion_Global"] = np.random.uniform(0.05, 0.25, size=len(df))

# Convertir columnas a numéricas
for col in ["Asistencia", "Promedio", "Tasa_Desercion_Global"]:
    df[col] = (
        df[col]
        .astype(str)
        .str.replace(",", ".", regex=False)
        .str.replace("%", "", regex=False)
        .str.strip()
    )
    df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

print("✅ Columnas convertidas a numéricas")

# -----------------------------
# Filtrar datos válidos
# -----------------------------
df = df[df["Asistencia"] > 0]
print(f"📈 Datos finales para entrenamiento: {df.shape}")

# -----------------------------
# Variable objetivo (dummy)
# -----------------------------
df["Deserta"] = (df["Asistencia"] < 85) | (df["Promedio"] < 5.0)
df["Deserta"] = df["Deserta"].astype(int)

# -----------------------------
# División y entrenamiento
# -----------------------------
# -----------------------------
# División y entrenamiento
# -----------------------------
X = df[["Asistencia", "Promedio", "Tasa_Desercion_Global"]]
y = df["Deserta"]

clases_unicas = y.unique()
print(f"🧩 Clases únicas en 'Deserta': {clases_unicas}")

if len(clases_unicas) < 2:
    unica = int(clases_unicas[0])
    print(f"⚠️ Solo se detectó una clase ({unica}) en los datos.")
    print(f"Se usará DummyClassifier con constant={unica} para continuar el flujo.")
    model = DummyClassifier(strategy="constant", constant=unica)
    model.fit(X, y)
    y_pred_prob = np.full(len(y), float(unica))
    auc = 0.5
else:
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print("🏗️ Entrenando modelo RandomForest...")
    model = RandomForestClassifier(n_estimators=120, random_state=42)
    model.fit(X_train, y_train)

    # Manejo seguro de predict_proba
    y_pred_prob = model.predict_proba(X_test)
    if y_pred_prob.shape[1] == 1:
        print("⚠️ Modelo solo devuelve una clase. Se asignan probabilidades 0.")
        y_pred_prob = np.zeros(len(X_test))
    else:
        y_pred_prob = y_pred_prob[:, 1]

    auc = roc_auc_score(y_test, y_pred_prob)
    print(f"🎯 AUC: {auc:.4f}")


# -----------------------------
# Guardar artefactos
# -----------------------------
os.makedirs(ARTIFACTS_DIR, exist_ok=True)
joblib.dump(model, MODEL_PATH)

if isinstance(y_pred_prob, np.ndarray) and len(y_pred_prob) > 0:
    threshold = float(np.percentile(y_pred_prob, 70))
else:
    threshold = 0.5

with open(THRESHOLD_PATH, "w") as f:
    json.dump({"threshold": threshold}, f)

print(f"💾 Modelo guardado en: {MODEL_PATH}")
print(f"💾 Threshold guardado en: {THRESHOLD_PATH}")
print("🚀 Entrenamiento completado correctamente.")
