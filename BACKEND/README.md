# 🧠 TutorVirtual-HT — Hackathon Duoc UC 2025
**Tutor Virtual Adaptativo con IA y Analítica Educativa**  
Desarrollado por: **Equipo God of Pan**

---

## 🏗️ Estructura del proyecto


---

## 🚀 1. Requisitos del sistema

| Requisito | Versión mínima | Comando para verificar |
|------------|----------------|-------------------------|
| **Python** | 3.10 – 3.14 | `python --version` |
| **pip** | ≥ 23.0 | `pip --version` |
| **Node.js** | ≥ 18 | `node -v` |
| **npm** | ≥ 9 | `npm -v` |
| **Git** | ≥ 2.30 | `git --version` |

Opcional:
- **Postman** o **Thunder Client (VS Code)** para probar el API.
- **virtualenv** para entornos limpios.

---

## 🧩 2. Instalación del entorno Python

1. Crear entorno virtual:
   ```bash
   python -m venv .venv
   source .venv/bin/activate        # En Linux/Mac
   .venv\Scripts\activate           # En Windows

2.  Instalar dependencias:
pip install -U pip setuptools wheel
pip install fastapi uvicorn python-dotenv joblib pandas numpy scikit-learn==1.4.2 openpyxl

3. Verificar instalación:
python -m fastapi --version

⚙️ 3. Configuración de variables de entorno

Crea un archivo .env en la raíz del proyecto con tu clave de OpenAI:
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
OPENAI_PROJECT=TutorVirtual

mportante:

No pongas comillas ni espacios.

No dejes punto final al copiar la key.

Genera la key desde: https://platform.openai.com/account/api-keys

4. Preparar datasets
Coloca los archivos en la carpeta data/ con los siguientes nombres:
data/
├── Asistencia.csv
├── Rendimiento.csv
└── Disercion.xlsx   # opcional
Cada archivo debe incluir datos como:

Asistencia (% o días)

Promedio (nota)

Tasa_Desercion_Global (opcional)
5. Entrenar el modelo de riesgo

Ejecuta:
python train_risk_model.py

O para entrenar con una muestra del dataset:
python train_risk_model.py 0.01   # usa 1%
python train_risk_model.py 0.05   # usa 5%

Esto genera los archivos:
artifacts/rf_pipe.joblib
artifacts/threshold.json

6. Iniciar el backend (FastAPI)
uvicorn main:app --reload

Abre la documentación interactiva:
👉 http://127.0.0.1:8000/docs

7. Probar la API con Postman

Endpoint 1 — Riesgo de deserción

POST http://127.0.0.1:8000/risk/predict

Body (JSON):
{
  "data": {
    "Asistencia": 92,
    "Promedio": 6.1,
    "Tasa_Desercion_Global": 0.05
  }
}

Respuesta esperada:

{
  "score": 0.33,
  "label": 0,
  "threshold": 0.5,
  "message": "Riesgo BAJO ✅"
}

Endpoint 2 — Plan de coaching educativo

POST http://127.0.0.1:8000/coach/plan

Body (JSON):
{
  "nombre": "Martín",
  "promedio": 5.6,
  "asistencia": 85,
  "estado_emocional": "desmotivado"
}

respuesta:

{
  "plan": "📚 Reforzar matemáticas básicas y hábitos de estudio diarios...",
  "kb_refs": ["/kb/matematicas_basicas", "/kb/habitos_estudio"]
}


1. Cómo reiniciar todo

Si deseas comenzar desde cero:
rm -rf artifacts
mkdir artifacts
python train_risk_model.py 0.01

Luego reinicia FastAPI:

uvicorn main:app --reload

12. Créditos

Hackathon Duoc UC 2025 – Desafío Educación
Equipo: God of Pan
Mentores: Duoc UC + Pontificia Universidad Católica de Chile
Proyecto: TutorVirtual-HT — Tutor Virtual Adaptativo con IA
