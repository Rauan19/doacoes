import { criarDoacao } from "../Controllers/doacoesController";

import { todasDoacoesPorCampanha } from "../Controllers/doacoesController";

import { Router } from "express";
import { SecuritToken } from "../middleware/authtoken";

export const routerDoacoes = Router()

routerDoacoes.post('/doacoes', SecuritToken, criarDoacao)
// Rota para listar todas as doações de uma campanha
routerDoacoes.get('/doacoes/campanha/:usuarioId', SecuritToken, todasDoacoesPorCampanha);