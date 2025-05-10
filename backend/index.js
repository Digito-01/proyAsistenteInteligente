const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes); // incluye rutas protegidas

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
