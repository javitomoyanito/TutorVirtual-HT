// FRONT/src/services/risk_service.js
export async function evaluarRiesgo(asistencia, promedio, tasaDesercion) {
try {
    const response = await fetch("http://localhost:8000/risk/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        Asistencia: parseFloat(asistencia),
        Promedio: parseFloat(promedio),
        Tasa_Desercion_Global: parseFloat(tasaDesercion),
    }),
    });

    if (!response.ok) throw new Error("Error en la API de riesgo");
    const data = await response.json();
    return data;
} catch (error) {
    console.error("❌ Error al conectar con el backend:", error);
    return { error: true, message: "No se pudo conectar al servidor de riesgo." };
}
}
