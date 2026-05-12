import './App.css'
import { useState, useEffect } from 'react'



function App() {

  type Tarefa = {
  id: string
  titulo: string
  descricao: string
  status: string
  created_at: string
}


  const [tarefas, setTarefas] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const criarTarefa = async () => {
    await fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ titulo, descricao})
    })
  }

  const buscarTarefas = () => {
  fetch('http://localhost:3000/tarefas')
    .then(res => res.json())
    .then(data => setTarefas(data))
}

useEffect(() => {
  buscarTarefas()
}, [])



  return (
    <div className='container'>
      <div className='box'>
        <h1>TAREFAS</h1>
        <div className='typeTask'>
        <p>Adicione o titulo:</p>
        <input type="text" placeholder='Digite sua tarefa...' className='textInput' onChange={(event)=> setTitulo(event.target.value)}/>
        </div>
        <div className='typeTask'>
        <p>Adicione sua decrição:</p>
        <input type="text" placeholder='Digite sua dewscrição...' className='textInput' onChange={(event)=> setTitulo(event.target.value)}/>
        </div>
        <button onClick={criarTarefa}>Adicionar</button>
        {tarefas.map((tarefa: Tarefa) => (
  <div key={tarefa.id}>
    <p>{tarefa.titulo}</p>
    <p>{tarefa.descricao}</p>
  </div>
))}
      </div>
      </div>
    
  )
}

export default App
