import 'dotenv/config'
import express, { type Request, type Response} from 'express'
import { supabase } from './database/supabase.js'
import cors from 'cors'






const app = express()

app.use(express.json())

app.use(cors())


app.get('/tarefas', async (req : Request, res: Response) => {
  const {data, error} = await supabase
  .from('tarefas')
  .select('*')

  if (error) return res.status(500).json({error})
    res.status(200).json(data)
})

app.get('/tarefas/:id', async (req: Request, res: Response) => {
  const {id} = req.params

  const {data, error} = await supabase
  .from('tarefas')
  .select('*')
  .eq('id', id)
  .single()

  if(error) return res.status(404).json({error})
    res.status(200).json(data)
})

app.post('/tarefas', async (req: Request, res: Response) => {
  const {titulo, descricao} = req.body

  const {data, error} = await supabase
  .from('tarefas')
  .insert({titulo, descricao})
  .select()

  if (error) return res.status(500).json({ error})
    res.status(201).json(data)


})

app.put('/tarefas/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  const {titulo, descricao, status} = req.body

  const {data, error} = await supabase
  .from('tarefas')
  .update({titulo, descricao, status})
  .eq('id', id)
  .select()

  if(error) return res.status(500).json({error})
    res.status(200).json(data)
})

app.delete('/tarefas/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  

  const {data, error} = await supabase
  .from('tarefas')
  .delete()
  .eq('id', id)
  .select()

  if(error) return res.status(500).json({error})
    res.status(200).json(data)
})



app.listen(process.env.PORT!, () => {
  console.log(`Servidor Funcionando!!!`)
})