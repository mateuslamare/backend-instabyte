import express from "express"; // Importa o Express para criação do servidor web
import multer from "multer"; // Importa o Multer para gerenciamento de uploads de arquivos
import cors from "cors"

// Importa as funções controladoras dos posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    // Define o destino para os arquivos salvos
    cb(null, 'uploads/'); 
    // Define a pasta "uploads" como destino
  },
  filename: function (req, file, cb) { 
    // Define o nome do arquivo salvo
    cb(null, file.originalname); 
    // Utiliza o nome original do arquivo
  }
});

// Cria uma instância do upload utilizando o armazenamento configurado
const upload = multer({ dest: "./uploads", storage }); 
// (Comentário sobre a alternativa para Linux/Mac removido para reduzir redundância)

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que o Express entenda requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar todos os posts (delega a execução para a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (delega a execução para a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") e delega a execução para a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; 
// Exporta a função routes para ser utilizada no servidor principal