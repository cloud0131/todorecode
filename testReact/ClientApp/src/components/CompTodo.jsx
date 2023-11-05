import React from "react";

export const CompTodo = (props) => {
    const { compTodos, onClickBack } = props;
    return (
        <div className="complete-area">
            <p className="title">完了のTodo</p>
            <ul>
                {compTodos.map((todo, index) => {
                    return (
                        <div key={todo.text} className="list-row">
                            <li>{todo.text}</li>
                            <li>{todo.compTime}</li>
                            <button onClick={() => onClickBack(index)}>戻す</button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};