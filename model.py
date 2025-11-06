import random

def predict_student_performance(data: dict):
    """Simula una predicción simple basada en datos del alumno."""
    score = round(random.uniform(0.4, 0.95), 2)
    drivers = sorted(data.keys(), key=lambda x: random.random())[:3]
    return {"score": score, "drivers": drivers}

