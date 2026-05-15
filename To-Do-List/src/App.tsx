import { useState, useEffect } from 'react'
import type {Tarefa } from './types/tarefas'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'



function App() {


  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [carregando, setCarregando] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [tituloEdit, setTituloEdit] = useState('')
  const [descricaoEdit, setDescricaoEdit] = useState('')

  const criarTarefa = async (titulo: string, descricao: string) => {
  if (!titulo.trim() || !descricao.trim()) {
    alert('O título e a descrição são obrigatórios!')
    return
  }
  await fetch(`${import.meta.env.VITE_API_URL}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descricao })
  })
  buscarTarefas()
}

  const deletarTarefa = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/tarefas/${id}`, {
      method: 'DELETE'
    })

    buscarTarefas()
  }


  const atualizarStatusTarefa = async (id: string, status: string) => {
    const novoStatus = status === 'pendente' ? 'concluída' : 'pendente'

    await fetch(`${import.meta.env.VITE_API_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ status: novoStatus })
    })

    buscarTarefas()
  }

  const editarTarefa = async (id: string, titulo: string, descricao: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ titulo, descricao })
    })

    setEditandoId(null)
    buscarTarefas()
  }

  const iniciarEdicao = (tarefa: Tarefa) => {
    setEditandoId(tarefa.id)
    setTituloEdit(tarefa.titulo)
    setDescricaoEdit(tarefa.descricao)
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
    setTituloEdit('')
    setDescricaoEdit('')
  }

  const salvarEdicao = () => {
    if (editandoId) {
      editarTarefa(editandoId, tituloEdit, descricaoEdit)
    }
  }

  const buscarTarefas = async () => {
    setCarregando(true)

    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/tarefas`)
    const data = await resposta.json()

    setTarefas(data)
    setCarregando(false)
  }

useEffect(() => {
  buscarTarefas()
}, [])



  return (
    <div className='app'>
      <main className='layout'>
        <TaskList
          tarefas={tarefas}
          carregando={carregando}
          editandoId={editandoId}
          tituloEdit={tituloEdit}
          descricaoEdit={descricaoEdit}
          onIniciarEdicao={iniciarEdicao}
          onSalvarEdicao={salvarEdicao}
          onCancelarEdicao={cancelarEdicao}
          onDeletar={deletarTarefa}
          onAtualizarStatus={atualizarStatusTarefa}
          onSetTituloEdit={setTituloEdit}
          onSetDescricaoEdit={setDescricaoEdit}
        />

        <TaskForm onCriar={criarTarefa} />

        
      </main>
      </div>
    
  )
}

export default App
