import React from "react";

export const InCompTodo = (props) => {

    const { incompTodos, onClickComp, onClickDelete } = props;

    return (
        <div className="incomplete-area">
            <p className="title">未完了のTodo</p>
            <ul>
                {incompTodos.map((todo, index) => {
                    return (
                        <div key={todo.text} className="list-row">
                            <li>{todo.text}</li>
                            <li>{todo.limit}</li>
                            <button onClick={() => onClickComp(index)}>完了</button>
                            <button onClick={() => onClickDelete(index)}>削除</button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};