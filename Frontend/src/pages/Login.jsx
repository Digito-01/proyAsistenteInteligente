import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../index.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md shadow-xl bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Usuario</span>
            </label>
            <input
              name="username"
              type="text"
              placeholder="Usuario"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Entrar
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-primary hover:underline">
              Regístrate aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
