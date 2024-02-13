import './App.css';
import AddTodoForm from './Components/AddTodoForm';
import TodoList from './Components/TodoList';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <p className='text-4xl text-zinc-50 text-center mt-36 font-bold -ml-10 mb-10'> My Todos</p>
      <Toaster />
      <AddTodoForm />
      <TodoList />
    </>
  );
}

export default App;
