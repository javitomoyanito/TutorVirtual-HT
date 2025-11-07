import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Obtener usuarios actuales desde localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validar que no exista el nombre de usuario
    if (users.some((u) => u.username === username)) {
      setError("Ese nombre de usuario ya existe.");
      return;
    }

    // Crear nuevo usuario
    const newUser = { username, email, password, rol: "user" };

    // Guardar lista actualizada
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    nav("/login");
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-4">Registrarse</h1>
        <form className="space-y-3" onSubmit={handleRegister}>
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn-primary w-full" type="submit">
            Crear cuenta
          </button>
        </form>

        <p className="text-sm mt-4 opacity-80">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
