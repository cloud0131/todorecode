import React, { useEffect } from "react";
import { useState } from "react";
import { InputTodo } from "./components/inputTodo";
import { InCompTodo } from "./components/InCompTodo";
import { CompTodo } from "./components/CompTodo";
import { ListItem } from "./components/ListItem";
import { GetTodo } from "./components/GetTodo";
import axios from "axios";
import "./style.css";

type User = {
    id: Number;
    Todo: String;
    limittime: String;
    comptime: String;
};

function App() {
    const URL = "https://localhost:7126/api/TodoItems";
    const [ users, setUsers ] = useState<User[]>([]);
    useEffect(() =>
    {
        axios.get<User[]>(URL).then((response) =>
            {setUsers(respose.date);}
        )
    },[]);

/*    useEffect(() => {
        const fetchData = async () => {
            const response = await GetTodo(URL);
            console.log(response.)
        };
    }, []);
*/
    const [todoId, setTodoId] = useState("");
    const [todoText, setTodoText] = useState("");
    const [incompTodos, setIncomTodos] = useState([]);
    const [compTodos, setCompTodos] = useState([]);
    const [limitTime, setLimit] = useState("");

    const onChangeTodoText = (event) => setTodoText(event.target.value);
    const onChangeLimit = (event) => setLimit(event.target.value);

    const onClickAdd = async () => {
        if (todoText === "" || limitTime === "") return;

        // TODO��API�ɑ��M���ēo�^���AID���擾
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: todoText, limit: limitTime }),
        });

        if (response.ok) {
            const newTodo = await response.json();
            setIncomTodos([
                ...incompTodos,
                { ID: newTodo.todoId, text: todoText, limit: limitTime, compTime: null },
            ]);
            setTodoText("");
            setLimit("");
            setTodoId(newTodo.todoId); // ID���Z�b�g
        }
    };


    // �����{�^�����s��
    const onClickComp = (index) => {
        const newIncompTodos = [...incompTodos];
        newIncompTodos.splice(index, 1);

        // �N���b�N����compTime��ݒ�
        const clickedTask = incompTodos[index];
        clickedTask.compTime = new Date().toLocaleString();

        const newCompTodos = [...compTodos, clickedTask];
        setIncomTodos(newIncompTodos);
        setCompTodos(newCompTodos);
    };

    // �߂�{�^���N���b�N��
    const onClickBack = (index) => {
        const newCompTodos = [...compTodos];
        newCompTodos.splice(index, 1);

        const newIncompTodos = [...incompTodos, compTodos[index]];
        setCompTodos(newCompTodos);
        setIncomTodos(newIncompTodos);
    };

    // �폜�{�^���N���b�N��
    const onClickDelete = (index) => {
        const newTodos = [...incompTodos];
        newTodos.splice(index, 1);
        setIncomTodos(newTodos);
    };



    return (
        <>
            <InputTodo
                todoText={todoText}
                onChangeTodo={onChangeTodoText}
                limitTime={limitTime}
                onChangeLimit={onChangeLimit}
                onClick={onClickAdd}
            />
            <InCompTodo
                incompTodos={incompTodos}
                onClickComp={onClickComp}
                onClickDelete={onClickDelete}
            />
            <CompTodo compTodos={compTodos} onClickBack={onClickBack} />

            <div>{users.map(user => (
                <ListItem id={user.id} Todo={user.Todo} limit={user.limittime} comp={user.comptime } />
            )) }</div>
        </>
    );
} export default App;