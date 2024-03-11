import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle, fetchTask, setTasks}) => { 
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} fetchTask={fetchTask} tasks={tasks} setTasks={setTasks}/>
        ))}
    </>
  )
}

export default Tasks
