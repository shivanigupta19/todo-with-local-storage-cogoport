import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import AddTodo from './addTodo';
import SearchTodo from './searchTodo';
import './app.css';
let i = -1;


function App() {
  const [todo, setTodo] = useState([]);
  const [item, setItem] = useState('');
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    if (localStorage.getItem("todo")) {
      setTodo(JSON.parse(localStorage.getItem("todo")))
    } else {
      localStorage.setItem("todo", JSON.stringify([]));
    }
  }, []);

  const addTodo = () => {
    if (item !== '') {
      i = i + 1;
      let x = [...todo, { id: i , text: item, complete: false }];
      setTodo(x);
      localStorage.setItem("todo", JSON.stringify(x));
      setItem('');
    }
  }
  const deleteTodo = (id) => {
    let x = todo.filter((todo) => {
      return todo.id !== id;
    });
    setTodo(x);
    localStorage.setItem("todo", x);
  }
  const handleOnChange = (position) => {
    const mapped = todo.map(task => {
      return task.id === position ? { ...task, complete: !task.complete } : { ...task };
    })
    console.log(mapped);
    console.log(position)
    setTodo(mapped);
    localStorage.setItem("todo", JSON.stringify(mapped));
  }

  let todoList = '';
  if (searchValue === "") {
    todoList = todo.map((todo, index) => {
      return (
        <div className='todo'>
          <input className='checkbox' type="checkbox" onChange={() => handleOnChange(index)}></input>
          <div className='row'>
          <span className={todo.complete ? "line" : "text"}>{todo.text}</span>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => deleteTodo(todo.id)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
        </div>
      );
    });
  } else {
    todoList = todo.map((todo,i) => {
      if (todo.text.search(searchValue) !== -1) {
        return (
          <div className='todo'>
            <input checked={todo.complete === true } className='checkbox' type="checkbox" onChange={() => handleOnChange(i)}></input>
            <span className={todo.complete ? "line" : "text"}>{todo.text}</span>
            <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => deleteTodo(todo.id)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
        );
      }
    });
  }

  return (
    <div>
      <h1>Todo</h1>
      <SearchTodo searchValue={searchValue} setSearchValue={setSearchValue} />
      <br></br>
      <AddTodo addTodo={addTodo} setItem={setItem} item={item} />
      <div className='todoList'>
        {todoList.length !== 0 ? todoList : <h2>No Todos!!!</h2>}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
