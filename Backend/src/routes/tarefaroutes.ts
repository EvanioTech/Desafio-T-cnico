import { Router} from 'express'

import { atualizarTarefa, buscarTarefaPorId, criarTarefa, deletarTarefa, listarTarefas } from '../controllers/tarefaController.js'


export const tarefaRoutes = Router()

tarefaRoutes.get('/tarefas', listarTarefas)

tarefaRoutes.get('/tarefas/:id', buscarTarefaPorId)


tarefaRoutes.post('/tarefas', criarTarefa)

tarefaRoutes.put('/tarefas/:id', atualizarTarefa)

tarefaRoutes.delete('/tarefas/:id', deletarTarefa)