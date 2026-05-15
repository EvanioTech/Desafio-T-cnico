import { useState, useEffect } from 'react'
import { Tarefa } from './types/tarefas'



function App() {


  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [tituloEdit, setTituloEdit] = useState('')
  const [descricaoEdit, setDescricaoEdit] = useState('')

  const criarTarefa = async () => {

    if (!titulo.trim() || !descricao.trim()) {
      alert('O título e a descrição são obrigatórios!')
      return
    }
    await fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ titulo, descricao})
    })

    setTitulo('')
    setDescricao('')
    buscarTarefas()
  }

  const deletarTarefa = async (id: string) => {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'DELETE'
    })

    buscarTarefas()
  }

  

  

  const atualizarStatusTarefa = async (id: string, status: string) => {
    const novoStatus = status === 'pendente' ? 'concluída' : 'pendente'

    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ status: novoStatus })
    })

    buscarTarefas()
  }

  const editarTarefa = async (id: string, titulo: string, descricao: string) => {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
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

    const resposta = await fetch('http://localhost:3000/tarefas')
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
        <section className='panel panel-lista'>
          <div className='panel-header'>
            <h1>Minhas tarefas</h1>
            <p>Veja aqui tudo que você já cadastrou.</p>
          </div>

          {carregando ? (
            <p className='empty-state'>Carregando tarefas...</p>
          ) : tarefas.length === 0 ? (
            <p className='empty-state'>Nenhuma tarefa cadastrada ainda.</p>
          ) : (
            <div className='task-list'>
              {tarefas.map((tarefa) => (
                editandoId === tarefa.id ? (
                  <article key={tarefa.id} className='task-card task-card-edit'>
                    <div className='form-row'>
                      <label htmlFor={`titulo-edit-${tarefa.id}`}>Título</label>
                      <input
                        id={`titulo-edit-${tarefa.id}`}
                        type='text'
                        className='textInput'
                        value={tituloEdit}
                        onChange={(e) => setTituloEdit(e.target.value)}
                      />
                    </div>
                    <div className='form-row'>
                      <label htmlFor={`desc-edit-${tarefa.id}`}>Descrição</label>
                      <input
                        id={`desc-edit-${tarefa.id}`}
                        type='text'
                        className='textInput'
                        value={descricaoEdit}
                        onChange={(e) => setDescricaoEdit(e.target.value)}
                      />
                    </div>
                    <div className='task-buttons'>
                      <button onClick={salvarEdicao} className='btn btn-save'>Salvar</button>
                      <button onClick={cancelarEdicao} className='btn btn-cancel'>Cancelar</button>
                    </div>
                  </article>
                ) : (
                  <article key={tarefa.id} className='task-card'>
                    <h2>{tarefa.titulo}</h2>
                    <p>{tarefa.descricao}</p>
                    <span className='task-status'>{tarefa.status}</span>
                    <div className='task-buttons'>
                      <button onClick={() => iniciarEdicao(tarefa)} className='btn btn-edit'>Editar</button>
                      <button onClick={() => atualizarStatusTarefa(tarefa.id, tarefa.status)} className='btn btn-status'>
                        {tarefa.status === 'pendente' ? 'Marcar como concluída' : 'Marcar como pendente'}
                      </button>
                      <button onClick={() => deletarTarefa(tarefa.id)} className='btn btn-delete'>Deletar</button>
                    </div>
                  </article>
                )
              ))}
            </div>
          )}
        </section>

        <section className='panel panel-form'>
          <div className='panel-header'>
            <h1>Adicionar tarefa</h1>
            <p>Preencha o formulário para criar uma nova tarefa.</p>
          </div>

          <div className='form-row'>
            <label htmlFor='titulo'>Título</label>
            <input
              id='titulo'
              type='text'
              placeholder='Digite sua tarefa...'
              className='textInput'
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='descricao'>Descrição</label>
            <input
              id='descricao'
              type='text'
              placeholder='Digite sua descrição...'
              className='textInput'
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            />
          </div>

          <button onClick={criarTarefa} className='btn'>Adicionar</button>
        </section>
      </main>
      </div>
    
  )
}

export default App
