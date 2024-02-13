import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/Slice";
import toast from "react-hot-toast";

function TodoItem({ todo }) {
  const { _id, name, description } = todo;
  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(_id));
    toast.success("Todo Deleted Successfully");
  };

  const handleComplete = () => {
    setCompleted(!completed);
  };
  if (!name || !description) {
    return <h1>No Data available</h1>;
  }
  return (
    <div className="flex  w-max items-center justify-center ml-96 ">
      <ul className="flex  gap-40 mb-10 ml-10">
        <div className="flex-row space-y-3 w-max">
          <li
            className={
              completed
                ? "text-3xl text-zinc-800 font-bold w-max line-through"
                : "text-3xl text-zinc-100 font-bold w-max"
            }
          >
            {name}
          </li>
          <li
            className={
              completed
                ? "text-lg text-zinc-800 font-semibold w-max line-through"
                : "text-lg text-zinc-100 font-semibold  max-w-max"
            }
          >
            {description}
          </li>
        </div>

        <div className="flex flex-row gap-10 mt-6">
          <button
            className="bg-slate-600 text-white text-lg font-semibold w-28 h-12 text-center  mt-1 hover:scale-105 transition-all"
            onClick={handleComplete}
          >
            {completed ? "Undo" : "Complete"}
          </button>

          <button
            className="bg-slate-600 text-white  text-lg font-semibold  w-28 h-12 text-center  mt-1 hover:scale-105 transition-all"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </ul>
    </div>
  );
}
export default TodoItem;
