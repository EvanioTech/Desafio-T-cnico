import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { tarefaRoutes } from './routes/tarefaroutes.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(tarefaRoutes)

app.listen(process.env.PORT!, () => {
  console.log(`Servidor Funcionando!!!`)
})