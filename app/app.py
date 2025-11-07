import requests
import streamlit as st

st.header("Predicción de riesgo de deserción")

payload = {
    "GEN_ALU": st.selectbox("Género", ["M","F"]),
    "EDAD_ALU": st.number_input("Edad", 10, 25, 15),
    "COD_ENSE2": st.number_input("Enseñanza", 0, 1000, 310),
    "COD_GRADO2": st.number_input("Grado", 0, 12, 2),
    "COD_JOR": st.number_input("Jornada", 0, 10, 1),
    "TASA_ASISTENCIA_ANUAL": st.slider("Asistencia", 0.0, 1.0, 0.9, 0.01),
    "PROM_GRAL": st.slider("Promedio", 1.0, 7.0, 5.5, 0.1),
    "PROM_GRAL_PCT": st.number_input("Percentil", 0, 100, 50),
    "CATEGORIA_ASIS_ANUAL": st.selectbox("Categoría Asistencia", ["ALTA","MEDIA","BAJA"])
}

if st.button("Evaluar Riesgo"):
    res = requests.post("http://localhost:8000/predict_risk", json=payload)
    st.json(res.json())
