import { useState } from 'react'


type TaskFormProps = {
  onCriar: (titulo: string, descricao: string) => void
}

export function TaskForm({ onCriar }: TaskFormProps) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const handleCriar = () => {
    onCriar(titulo, descricao)
    setTitulo('')
    setDescricao('')
  }

  return (
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
          onChange={(e) => setTitulo(e.target.value)}
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
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <button onClick={handleCriar} className='btn'>Adicionar</button>
    </section>
  )
}