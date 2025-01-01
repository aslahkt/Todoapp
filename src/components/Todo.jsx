import React, { useState, useEffect } from "react";
import Todoitems from "./Todoitems";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [complete, setComplete] = useState();
  const [allTodo, setAllTodo] = useState(false);
  const [notComplete, setNotComplete] = useState();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText && inputDate && inputDescription) {
      const newTodo = {
        id: editingId || Date.now(),
        text: inputText,
        isComplete: false,
        date: inputDate,
        description: inputDescription,
      };
      const updatedTodos = editingId
        ? todos.map((todo) => (todo.id === editingId ? newTodo : todo))
        : [...todos, newTodo];

      setTodos(updatedTodos);

      resetInputs();
    }
  };

  const resetInputs = () => {
    setInputText("");
    setInputDate("");
    setInputDescription("");
    setEditingId(null);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputText(todoToEdit.text);
      setInputDate(todoToEdit.date);
      setInputDescription(todoToEdit.description);
      setEditingId(id);
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    //
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  const completeBtnHandler = () => {
    const completedTodos = todos.filter((todo) => todo.isComplete);
    setComplete(completedTodos);
    setAllTodo(true);
    setNotComplete("");
  };

  const unCompleteBtnHandler = () => {
    const notCompletedTodos = todos.filter((todo) => !todo.isComplete);
    setNotComplete(notCompletedTodos);
    setComplete("");
    setAllTodo(true);
  };

  const todosHandler = () => {
    todos;
    setAllTodo(false);
    setComplete("");
    setNotComplete("");
  };

  return (
    <div className=" container  mx-auto p-4 bg-gray-500 rounded-2xl mt-5 p-0">
      <h1 className="text-[50px] font-bold ml-2 text-white ">Todo List</h1>
      <div className="flex flex-col my-4 gap-2 w-[50%] items-center  ">
        <input
          type="text"
          required
          placeholder="Add a new task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="text-black w-3/5	 py-3 px-8 rounded-full border-2 border-gray-600 outline-none"
        />

        <input
          type="date"
          required
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="text-black w-3/5	 py-3 px-8 rounded-full border-2 border-gray-600 outline-none"
        />

        <input
          type="text"
          required
          placeholder="Add a description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          className="text-black w-3/5	 py-3 px-8 rounded-full  border-2 border-gray-600 outline-none"
        />

        <button
          onClick={addTodo}
          className="bg-gray-800 text-white p-2 ml-[100px] rounded-xl w-2/5	"
        >
          {editingId ? "Update" : "Add"}
        </button>

        <div className=" flex-row  ">
          <button
            className=" rounded-md w-[250px] bg-blue-300"
            onClick={todosHandler}
          >
            All Todos
          </button>

          <button
            className=" rounded-md w-[250px] bg-blue-300"
            onClick={completeBtnHandler}
          >
            complete
          </button>

          <button
            className="rounded-md w-[250px] bg-blue-300"
            onClick={unCompleteBtnHandler}
          >
            incomplete
          </button>
        </div>
      </div>

      {!allTodo &&
        todos.map((todo) => (
          <Todoitems
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isComplete={todo.isComplete}
            date={formatDate(todo.date)}
            deleteTodo={deleteTodo}
            toggle={toggleTodo}
            editTodo={editTodo}
            description={todo.description}
          />
        ))}

      {notComplete &&
        notComplete.map((todo) => (
          <Todoitems
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isComplete={todo.isComplete}
            date={formatDate(todo.date)}
            deleteTodo={deleteTodo}
            toggle={toggleTodo}
            editTodo={editTodo}
            description={todo.description}
          />
        ))}

      {complete &&
        complete.map((todo) => (
          <Todoitems
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isComplete={todo.isComplete}
            date={formatDate(todo.date)}
            deleteTodo={deleteTodo}
            toggle={toggleTodo}
            editTodo={editTodo}
            description={todo.description}
          />
        ))}
    </div>
  );
};

export default Todo;
