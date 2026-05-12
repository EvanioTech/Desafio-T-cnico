import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/tarefas')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setTarefas(data)
    })
    
  }, [])
  

  return (
    <div className='container'>
      <div className='box'>
        <h1>TAREFAS</h1>
        <div className='typeTask'>
        <p>Adicione sua tarefa:</p>
        <input type="text" placeholder='Digite sua tarefa...' className='textInput'/>
        </div>
        <div className='typeTask'>
        <p>Adicione sua decrição:</p>
        <input type="text" placeholder='Digite sua dewscrição...' className='textInput'/>
        </div>
        <button>Adicionar</button>
      </div>
      </div>
    
  )
}

export default App
