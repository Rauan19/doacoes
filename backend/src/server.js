import express, { json } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { MeuBanco } from './config/db/banco';
import router from './routes/user';
import routercampanha from './routes/companha';
import { routerFalhaouSucesso } from './routes/rotasdePagamento';
import { routerDoacoes } from './routes/doacoes';
import path from 'path';

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

MeuBanco()
app.use(router)
app.use(routerDoacoes)
app.use(routercampanha)
app.use(routerFalhaouSucesso)


const Port = process.env.PORT || 4005

app.listen(Port, () => {
    console.log("Server rodando na porta 4005")
})

