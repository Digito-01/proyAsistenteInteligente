import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const Nombre = form.get("Nombre");
    const username = form.get("username");
    const password = form.get("password");

    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Nombre, username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md shadow-xl bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre completo</span>
            </label>
            <input
              name="Nombre"
              type="text"
              placeholder="Ej. Juan Pérez"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre de usuario</span>
            </label>
            <input
              name="username"
              type="text"
              placeholder="Ej. juan123"
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
              placeholder="********"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-success w-full">
              Registrarse
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-primary hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
