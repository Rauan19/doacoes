import { Router } from "express";
import { CriarUser } from "../Controllers/UserController";
import { AuthLoginUser } from "../Controllers/UserController";
import { enviarEmailRedefinicao, redefinirSenha } from "../Controllers/redefinirSenha";
const router = Router()

 router.post("/newUser", CriarUser)
 router.post("/loginUser", AuthLoginUser )

 router.post("/redefinirsenha", enviarEmailRedefinicao)

 router.post("/redefinirSenha/:token", redefinirSenha)
 //"email": "rauan1@gmail.com",
//"_id": "66f5c7dd77b9ef8ea5783025",

 export default router
