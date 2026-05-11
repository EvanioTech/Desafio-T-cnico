import express, {Request, Response} from 'express'


const port = 3000

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
  res.json({ message: 'funcionando' })
})

app.listen(port, () => {
  console.log(`Servidor Funcionando!!!`)
})