import axios from "axios";
import { useState, useEffect } from "react";
const BASE_URL="https://mdwaheed.dev"
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/todo/get-tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setTodos(response.data.allTasks);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return; //prevents from entering empty task
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/todo/create-tasks`,
        {
          task: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTodos((prev) => [...prev, response.data.newTask]);
      setText("");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function toggleTodo(id) {
    try {
      const token = localStorage.getItem("token");
      const currentTodo = todos.find((t) => t._id === id); //finding the task that was clicked
      axios.patch(
        `${BASE_URL}/todo/update-task${id}`,
        {
          status: !currentTodo.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: !t.status } : t)),
      ); // done pae click kare baad jab woh specific task kae done pae click kare toh task complete bolke batata .By default task incomplete rehta
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/todo/delete-task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center-safe text-blue-50 bg-slate-800 min-h-screen text-sm">
      <form onSubmit={handleAdd} className="mt-10">
        <label htmlFor="todo" className="mr-1">
          Todo:
        </label>
        <input
          type="text"
          className="border-2 mr-3 focus:outline-none px-2 py-1"
          placeholder="Enter Your Task"
          id="todo"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="rounded-full px-3 py-1 border-2 cursor-pointer border-slate-700 font-mono hover:bg-slate-700">
          Add
        </button>
      </form>
      <ul className="list-decimal">
        {todos.map((t) => (
          <li key={t._id} className="mt-2">
            <p className={t.status ? "line-through text-gray-500" : ""}>
              {t.text}
            </p>
            <span>
              {t.status ? <p>Task Complete</p> : <p>Task Incomplete</p>}
            </span>
            <button
              onClick={() => toggleTodo(t._id)}
              className="rounded-full px-3 py-0.5 cursor-pointer border-2 border-blue-500 hover:bg-blue-500 mr-10 mt-2"
            >
              Done
            </button>
            <button
              onClick={() => deleteTodo(t._id)}
              className="rounded-full px-3 py-0.5 cursor-pointer border-2 border-red-500 hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
