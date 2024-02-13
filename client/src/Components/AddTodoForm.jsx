import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, fetchTodos } from '../redux/Slice';
import toast from 'react-hot-toast';

const AddTodoForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addTodo({
      name,
      description
    }));
    toast.success("Todo Added Successfully")
    dispatch(fetchTodos());

    setName('');
    setDescription('');
  };

  return (
    <div className='flex items-center justify-center ml-16  mb-10 '>
      <form
        className='flex flex-row gap-16'
        onSubmit={handleSubmit}>
        <div className='flex space-x-14   text-zinc-900 text-lg'>
          <input
            className='p-3 outline-none border rounded-lg'
            type="text"
            placeholder="Enter todo name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='p-3 outline-none border rounded-lg'
            type="text"
            placeholder="Enter todo description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex'>
          <button
            className='bg-slate-600 text-white w-28 h-12 text-center  mt-1 hover:scale-105 transition-all'
            type="submit">Add Todo</button>
        </div>

      </form>
    </div>
  );
};

export default AddTodoForm;
