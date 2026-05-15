import { type Request,type Response } from 'express'
import { supabase } from '../database/supabase.js'
import * as z from 'zod'


const tarefaSchema = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  descricao: z.string().optional(),
  status: z.enum(['pendente', 'concluída']).optional()
})

const atualizarTarefaSchema = z.object({
  titulo: z.string().min(1).optional(),
  descricao: z.string().optional(),
  status: z.enum(['pendente', 'concluída']).optional()
})


export const listarTarefas = async (req: Request, res: Response) => {
    const {data, error} = await supabase
  .from('tarefas')
  .select('*')

  if (error) return res.status(500).json({error})
    res.status(200).json(data)
}

export const buscarTarefaPorId = async (req: Request, res: Response) => {
  const {id} = req.params

  const {data, error} = await supabase
  .from('tarefas')
  .select('*')
  .eq('id', id)
  .single()

  if(error) return res.status(404).json({error})
    res.status(200).json(data)
}

export const criarTarefa = async (req: Request, res: Response) => {


    const result = tarefaSchema.safeParse(req.body)
    
     if (!result.success) {
    return res.status(400).json({ error: result.error.format() })
  }

  const {titulo, descricao} = result.data

  const {data, error} = await supabase
  .from('tarefas')
  .insert({titulo, descricao})
  .select()

  if (error) return res.status(500).json({ error})
    res.status(201).json(data)


}

export const atualizarTarefa = async (req: Request, res: Response) => {

    const result = atualizarTarefaSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.format() })
  }

  const {id} = req.params

  const {titulo, descricao, status} = result.data

  const {data, error} = await supabase
  .from('tarefas')
  .update({titulo, descricao, status})
  .eq('id', id)
  .select()

  if(error) return res.status(500).json({error})
    res.status(200).json(data)
}

export const deletarTarefa = async (req: Request, res: Response) => {

    const {id} = req.params
  

  const {data, error} = await supabase
  .from('tarefas')
  .delete()
  .eq('id', id)
  .select()

  if(error) return res.status(500).json({error})
    res.status(200).json(data)
}