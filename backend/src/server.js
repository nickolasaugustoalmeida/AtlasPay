// Importa o named export "app" do arquivo app.js
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});