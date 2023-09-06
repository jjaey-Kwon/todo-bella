import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';


const TodoList =({ todos, onRemove, onToggle, onInsertToggle, onChangeSelectedTodo })=>{
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    onInsertToggle={onInsertToggle}
                    onChangeSelectedTodo={onChangeSelectedTodo}
                />
                
            ))}
        </div>
    );
};

export default React.memo(TodoList);