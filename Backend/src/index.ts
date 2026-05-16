import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { tarefaRoutes } from './routes/tarefaroutes.js'


const app = express()
app.use(express.json())
app.use(cors({
  origin: 'https://desafio-t-cnico-gamma.vercel.app'
}))
app.use(tarefaRoutes)

app.listen(process.env.PORT!, () => {
  console.log(`Servidor Funcionando!!!`)
})