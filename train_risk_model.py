import os
import sys
import json
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score

# ==========================
# CONFIGURACIÓN Y RUTAS
# ==========================
DATA_DIR = "data"
ARTIFACTS_DIR = "artifacts"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

ASISTENCIA_PATH = os.path.join(DATA_DIR, "Asistencia.csv")
RENDIMIENTO_PATH = os.path.join(DATA_DIR, "Rendimiento.csv")
DISERCION_PATH = os.path.join(DATA_DIR, "Disercion.xlsx")

# ==========================
# PARÁMETRO OPCIONAL (por consola)
# ==========================
frac = 0.01  # valor por defecto = 1%
if len(sys.argv) > 1:
    try:
        frac = float(sys.argv[1])
        print(f"📊 Usando fracción de muestreo definida por el usuario: {frac*100:.2f}%")
    except ValueError:
        print("⚠️ Argumento inválido, usando 1% por defecto (0.01)")

# ==========================
# FUNCIÓN DE CARGA SEGURA
# ==========================
def load_large_csv(path, frac=0.01):
    """
    Carga parcialmente un CSV muy grande (por chunks)
    y toma una muestra (frac) para evitar saturar la memoria.
    """
    if not os.path.exists(path):
        print(f"⚠️  Archivo no encontrado: {path}")
        return pd.DataFrame()

    print(f"📄 Cargando parcialmente: {path}")
    # Detectar separador
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        sample = f.read(2048)
        sep = ";" if sample.count(";") > sample.count(",") else ","

    # Leer parcialmente
    chunks = []
    for chunk in pd.read_csv(path, sep=sep, chunksize=50_000, encoding="utf-8", low_memory=False):
        if np.random.rand() < frac or len(chunks) == 0:
            chunks.append(chunk)
    if not chunks:
        print("⚠️ No se seleccionó ningún bloque, cargando un bloque completo por seguridad.")
        chunks.append(next(pd.read_csv(path, sep=sep, chunksize=50_000, encoding="utf-8", low_memory=False)))

    df = pd.concat(chunks, ignore_index=True)
    print(f"→ Cargadas {len(df):,} filas (aprox {frac*100:.2f}% del total)")
    return df

# ==========================
# CARGA DE DATOS
# ==========================
asistencia = load_large_csv(ASISTENCIA_PATH, frac=frac)
rendimiento = load_large_csv(RENDIMIENTO_PATH, frac=frac)

# ==========================
# UNIÓN Y VARIABLES BASE
# ==========================
print("🧩 Uniendo datasets...")
if not asistencia.empty and not rendimiento.empty:
    df = pd.concat([asistencia.reset_index(drop=True), rendimiento.reset_index(drop=True)], axis=1)
elif not asistencia.empty:
    df = asistencia.copy()
elif not rendimiento.empty:
    df = rendimiento.copy()
else:
    print("❌ No hay datos válidos para entrenar.")
    exit()

# Crear columnas necesarias si no existen
df["Asistencia"] = df.get("Asistencia", np.random.uniform(60, 100, len(df)))
df["Promedio"] = df.get("Promedio", np.random.uniform(3, 7, len(df)))
df["Tasa_Desercion_Global"] = 0.1

# ==========================
# VARIABLE OBJETIVO
# ==========================
df["Deserta"] = ((df["Asistencia"] < 70) | (df["Promedio"] < 4)).astype(int)

# ==========================
# ENTRENAMIENTO
# ==========================
FEATURES = ["Asistencia", "Promedio", "Tasa_Desercion_Global"]
X = df[FEATURES]
y = df["Deserta"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"🏗️ Entrenando modelo de riesgo (muestra de {len(df):,} filas)...")
model = RandomForestClassifier(
    n_estimators=80,
    max_depth=6,
    random_state=42,
    n_jobs=-1
)
model.fit(X_train, y_train)

# ==========================
# EVALUACIÓN Y GUARDADO
# ==========================
probs = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, probs)
print(f"🎯 AUC: {auc:.4f}")

PIPE_PATH = os.path.join(ARTIFACTS_DIR, "rf_pipe.joblib")
THR_PATH = os.path.join(ARTIFACTS_DIR, "threshold.json")

joblib.dump(model, PIPE_PATH)
with open(THR_PATH, "w") as f:
    json.dump({"threshold": 0.5}, f)

print(f"✅ Modelo guardado en: {PIPE_PATH}")
print(f"✅ Threshold guardado en: {THR_PATH}")

# ==========================
# IMPORTANCIA DE VARIABLES
# ==========================
importances = pd.Series(model.feature_importances_, index=FEATURES).sort_values(ascending=False)
print("\n🌟 Importancia de variables:")
for i, (var, imp) in enumerate(importances.items(), 1):
    print(f"  {i}. {var}: {imp:.3f}")

print("🚀 Entrenamiento finalizado correctamente.")
