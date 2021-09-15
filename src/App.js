import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/form';
import TodoList from './components/todolist';

function App() {

  //States
  const[inputText, setInputText]= useState(" "); 
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos]= useState([]);
  
  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  },[]);
  
  //Uses Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);


  //functions
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos. filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos. filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //Save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal=JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);

    }
  };

  return (
    <div className="App">
      <header>
         <h1>Todo List</h1>
      </header>
      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      
      />
      <TodoList setTodos={setTodos} 
      filteredTodos={filteredTodos}
      todos={todos}
      />
    </div>
  );
}

export default App;