import { Router } from "express";
import { criarPagamento, OAuthCallback, OAuthMecadadoPago } from "../Controllers/pagamento";
import { notificacaoPagamento } from "../Controllers/pagamento";
import { SecuritToken } from "../middleware/authtoken";

export const routerFalhaouSucesso = Router()


// Rota para redirecionamento após pagamento aprovado
routerFalhaouSucesso.get('/sucesso', (req, res) => {
  return  res.send('<h1>Pagamento realizado com sucesso!</h1>');
});

// Rota para redirecionamento após pagamento falhado
routerFalhaouSucesso.get('/falha', (req, res) => {

   return res.send('<h1>Pagamento falhou. Tente novamente!</h1>');
});

// Rota para redirecionamento após pagamento pendente
routerFalhaouSucesso.get('/pendente', (req, res) => {
   return res.send('<h1>Pagamento pendente. Aguarde a confirmação.</h1>');
});

routerFalhaouSucesso.post("/criarpagamento", SecuritToken, criarPagamento)

routerFalhaouSucesso.post("/notfication/webhook", SecuritToken, notificacaoPagamento)
