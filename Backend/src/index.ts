import 'dotenv/config'
import express, { type Request, type Response} from 'express'
import { supabase } from './database/supabase.js'




const app = express()

app.use(express.json())


app.get('/tarefas', async (req : Request, res: Response) => {
  const {data, error} = await supabase
  .from('tarefas')
  .select('*')

  if (error) return res.status(500).json({error})
    res.json(data)
})

app.listen(process.env.PORT!, () => {
  console.log(`Servidor Funcionando!!!`)
})