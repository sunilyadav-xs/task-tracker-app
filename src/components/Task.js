import { useState, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle, fetchTask, tasks, setTasks}) => {
  
  const [showUpdTask, setShowUpdTask] = useState(false);
  const [updText, setUpdText] = useState("");
  const [updDay, setUpdDay] = useState("");
  const [updReminder, setUpdReminder] = useState(false);
  const [textFocus, setTextFocus] = useState(false);
  const [dayFocus, setDayFocus] = useState(false);
  const [reminderFocus, setReminderFocus] = useState(false);

  useEffect(() => {
    setUpdText(task.text);
    setUpdDay(task.day);
    setUpdReminder(task.reminder);
  }, [task]);

  const updateTask = async (id) => {
    const taskToUpdate = await fetchTask(id);
    const updTask = { text: updText || task.text, day: updDay || task.day, reminder: updReminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, text: data.text, day: data.day, reminder: data.reminder} : task
      )
    );
  };


  const onSubmit = (e) => {
    e.preventDefault()

    updateTask(task.id);
    setShowUpdTask(!showUpdTask);

    
  }

  return (
   <>
    {showUpdTask && <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Update Task"
          value={textFocus ? updText : task.text}
          onChange={(e) => {setUpdText(e.target.value) ; setTextFocus(true)}}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="text" placeholder="Update Day & Time" value={dayFocus ? updDay:task.day}
          onChange={(e) => {setUpdDay(e.target.value); setDayFocus(true)}} />
      </div>
      <div className="form-control form-control-check">
        <label>Update Reminder</label>
        <input type="checkbox" 
        checked={reminderFocus? updReminder:task.reminder}
        value={reminderFocus? updReminder:task.reminder}
        onChange={(e) => {setUpdReminder(e.currentTarget.checked); setReminderFocus(true)}} />
      </div>

      <input type="submit" value="Update Task" className="btn btn-block" />
    </form>}
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <div className="icons">
        <FaEdit onClick={() => setShowUpdTask(!showUpdTask)} />
        <FaTimes
          style={{ color: "red", curser: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  </>
  );
};

export default Task;
