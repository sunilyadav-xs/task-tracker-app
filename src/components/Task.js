import { FaTimes, FaEdit } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <div className="icons">
        <FaEdit />
        <FaTimes
          style={{ color: "red", curser: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
