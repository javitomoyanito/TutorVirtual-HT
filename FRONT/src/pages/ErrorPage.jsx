import React from "react";

export default function ErrorPage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>⚠️ Error</h1>
      <p>Ha ocurrido un problema o la página no existe.</p>
      <a href="/" style={{ color: "#007bff" }}>
        Volver al inicio
      </a>
    </div>
  );
}