import React, { useCallback, useEffect, useReducer, useRef } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
}
// Todo[]
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];

      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);
  // useCallback
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    // useReducer
    <div className="todo-app">
      <div className="container">
        <div className="pt-4">
          <button
            type="button"
            className="btn btn-dark d-block ms-auto"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Tooltip on top"
          >
            Total Task : {todos.length}
          </button>
          <div className="w-70 text-center mt-5">
            <div className="input-group mb-3 w-50 m-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Task"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                ref={newTodoRef}
              />
              <button
                className="btn btn-dark"
                type="button"
                id="button-addon2"
                onClick={onAddTodo}
              >
                Add Task
              </button>
            </div>
            {/* <input type="text" className="w-50" ref={newTodoRef} />
          <button onClick={onAddTodo}>Add</button> */}
            <div className="show-task">
              <table className="table table-dark table-striped w-50 m-auto mt-5 rounded">
                <tbody>
                  {todos.map((todo, index) => (
                    <tr key={todo.id}>
                      <td>{index + 1}</td>
                      <td>
                        {" "}
                        <p className="col-md-6 d-flex">{todo.text}</p>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            dispatch({ type: "REMOVE", id: todo.id })
                          }
                          className="btn btn-light"
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
