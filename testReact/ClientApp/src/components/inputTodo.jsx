import React from "react";

export const InputTodo = (props) => {
    const { todoText, onChangeTodo, limitTime, onChangeLimit, onClick } = props;
    return (
        <div className="input-area">
            <input
                placeholder="Todoを入力"
                value={todoText}
                onChange={onChangeTodo}
            />
            <input
                type={"datetime-local"}
                value={limitTime}
                onChange={onChangeLimit}
            />
            <button onClick={onClick}>追加</button>
        </div>
    );
};