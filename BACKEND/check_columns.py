import pandas as pd
import os

# Ruta base: detecta automáticamente la carpeta "data"
data_dir = os.path.join(os.path.dirname(__file__), "data")

asistencia_path = os.path.join(data_dir, "Asistencia.csv")
rendimiento_path = os.path.join(data_dir, "Rendimiento.csv")

def preview_csv(path):
    try:
        # Lee una pequeña muestra del archivo para detectar separador
        with open(path, 'r', encoding='latin-1') as f:
            sample = f.read(1024)
        sep = ';' if sample.count(';') > sample.count(',') else ','
        print(f"📄 {os.path.basename(path)} → separador detectado: '{sep}'")

        # Carga solo las primeras 3 filas
        df = pd.read_csv(path, sep=sep, nrows=3, encoding='latin-1')
        print(f"🔹 Columnas: {list(df.columns)}\n")
        return df
    except Exception as e:
        print(f"⚠️ Error leyendo {path}: {e}\n")

print("\n🟩 Asistencia:")
preview_csv(asistencia_path)

print("\n🟦 Rendimiento:")
preview_csv(rendimiento_path)
