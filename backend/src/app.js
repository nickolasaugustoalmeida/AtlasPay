import express from "express";

const app = express();

//Permite interpretar o JSON no corpo das requisições
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

// Named export: deve ser importado usando { app }
export { app };