import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle',
        error: null
    },
    reducers: {
        //Adding Todos
        addTodoStart: state => {
            state.status = 'loading';
        },
        addTodoSuccess: (state, action) => {
            state.status = 'succeeded';
            state.todos.push(action.payload);
            state.error = null;
        },
        addTodoFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        //Fetching Todo From DB
        fetchTodosStart: state => {
            state.status = 'loading';
        },
        fetchTodosSuccess: (state, action) => {
            state.status = 'succeeded';
            state.todos = action.payload;
            state.error = null;
        },
        fetchTodosFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        //Deleting Todos from DB
        deleteTodoStart: state => {
            state.status = 'loading';
        },
        deleteTodoSuccess: (state, action) => {
            state.status = 'succeeded';
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
            state.error = null;
        },
        deleteTodoFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }

    }

});

export const { removeTodo, addTodoStart, addTodoSuccess, addTodoFailure, fetchTodosStart, fetchTodosSuccess, fetchTodosFailure, deleteTodoStart, deleteTodoSuccess, deleteTodoFailure } = todoSlice.actions;

export const selectedTodos = state => state.todos.todos;

export const fetchTodos = () => async dispatch => {
    dispatch(fetchTodosStart());
    try {
        const response = await axios.get('http://localhost:3001/api/todos'); 
        if (response.status >= 200 && response.status < 3000) {
            const todos = await response.data.todos;
            dispatch(fetchTodosSuccess(todos));
        } else {
            throw new Error("Failed to Fetch Data at slice");
        }

    } catch (error) {
        dispatch(fetchTodosFailure(error.message));
    }
};

export const addTodo = (todoData) => async dispatch => {
    dispatch(addTodoStart());
    try {
        const response = await axios.post("http://localhost:3001/api/todos", todoData);
        if (response.status >= 200 && response.status < 3000) {
            const newTodo = response.data;
            dispatch(addTodoSuccess(newTodo));
        } else {
            throw new Error("Error at addTodo")
        }
    } catch (error) {
        dispatch(addTodoFailure(error.message))
    }
}


export const deleteTodo = (todoId) => async dispatch => {
    dispatch(deleteTodoStart());
    try {
        const response = await axios.delete(`http://localhost:3001/api/todos/${todoId}`);
        if (response.status >= 200 && response.status < 300) {
            dispatch(deleteTodoSuccess(todoId))
        } else {
            throw new Error("Err deleting todo")
        }
    } catch (error) {
        console.error("Error deleting todo at => ", deleteTodo);
    }
}
export default todoSlice.reducer;