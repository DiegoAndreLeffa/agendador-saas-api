import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { AppDataSource } from './database/data-source';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// Inicializa a conexão com o banco
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco de Dados Conectado com Sucesso!");
    
    // Só sobe o servidor se o banco conectar
    app.listen(process.env.PORT, () => {
      console.log(`🔥 Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar no banco:", error);
  });
