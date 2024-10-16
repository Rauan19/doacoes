import { allCampanhaporUserId, criarCampanha, DeletarCampanha } from "../Controllers/CampanhaController";
import { TodasDoacoes } from "../Controllers/CampanhaController";
import { editarCampanha } from "../Controllers/CampanhaController";
import upload from "../config/multer";

import { Router } from "express";
import { SecuritToken } from "../middleware/authtoken";

const routercampanha = Router()

routercampanha.post("/campanhas/:usuarioId", SecuritToken, upload.single("imagem"), criarCampanha)

routercampanha.get("/allcampanha", TodasDoacoes )

routercampanha.get("/campanha/:usuarioId", SecuritToken, allCampanhaporUserId)

routercampanha.delete("/campanha/:id", SecuritToken, DeletarCampanha)

routercampanha.put('/campanha/:id', SecuritToken, upload.single('imagem'), editarCampanha);

export default routercampanha