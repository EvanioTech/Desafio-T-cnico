import { useState, useEffect } from 'react'



function App() {

  type Tarefa = {
  id: string
  titulo: string
  descricao: string
  status: string
  created_at: string
}


  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [carregando, setCarregando] = useState(false)

  const criarTarefa = async () => {
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
                <article key={tarefa.id} className='task-card'>
                  <h2>{tarefa.titulo}</h2>
                  <p>{tarefa.descricao}</p>
                  <span className='task-status'>{tarefa.status}</span>
                  <button onClick={() => atualizarStatusTarefa(tarefa.id, tarefa.status)} className='btn btn-status'>
                    {tarefa.status === 'pendente' ? 'Marcar como concluída' : 'Marcar como pendente'}
                  </button>
                  <button onClick={() => deletarTarefa(tarefa.id)} className='btn btn-delete'>Deletar</button>
                </article>
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
