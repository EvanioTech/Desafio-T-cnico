import type { Tarefa } from '../types/tarefas'

type TaskListProps = {
  tarefas: Tarefa[]
  carregando: boolean
  editandoId: string | null
  tituloEdit: string
  descricaoEdit: string
  onIniciarEdicao: (tarefa: Tarefa) => void
  onSalvarEdicao: () => void
  onCancelarEdicao: () => void
  onDeletar: (id: string) => void
  onAtualizarStatus: (id: string, status: string) => void
  onSetTituloEdit: (valor: string) => void
  onSetDescricaoEdit: (valor: string) => void
}

export function TaskList({
  tarefas,
  carregando,
  editandoId,
  tituloEdit,
  descricaoEdit,
  onIniciarEdicao,
  onSalvarEdicao,
  onCancelarEdicao,
  onDeletar,
  onAtualizarStatus,
  onSetTituloEdit,
  onSetDescricaoEdit
}: TaskListProps) {
  return (
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
                        onChange={(e) => onSetTituloEdit(e.target.value)}
                      />
                    </div>
                    <div className='form-row'>
                      <label htmlFor={`desc-edit-${tarefa.id}`}>Descrição</label>
                      <input
                        id={`desc-edit-${tarefa.id}`}
                        type='text'
                        className='textInput'
                        value={descricaoEdit}
                        onChange={(e) => onSetDescricaoEdit(e.target.value)}
                      />
                    </div>
                    <div className='task-buttons'>
                      <button onClick={onSalvarEdicao} className='btn btn-save'>Salvar</button>
                      <button onClick={onCancelarEdicao} className='btn btn-cancel'>Cancelar</button>
                    </div>
                  </article>
                ) : (
                  <article key={tarefa.id} className='task-card'>
                    <h2>{tarefa.titulo}</h2>
                    <p>{tarefa.descricao}</p>
                    <span className='task-status'>{tarefa.status}</span>
                    <div className='task-buttons'>
                      <button onClick={() => onIniciarEdicao(tarefa)} className='btn btn-edit'>Editar</button>
                      <button onClick={() => onAtualizarStatus(tarefa.id, tarefa.status)} className='btn btn-status'>
                        {tarefa.status === 'pendente' ? 'Marcar como concluída' : 'Marcar como pendente'}
                      </button>
                      <button onClick={() => onDeletar(tarefa.id)} className='btn btn-delete'>Deletar</button>
                    </div>
                  </article>
                )
              ))}
            </div>
          )}
        </section>
  )
}


