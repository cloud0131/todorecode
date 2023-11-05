import React from "react";

export const GetTodo = (URL) => {
    return new Promise((resolve, rejct) => {
        fetch(URL)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error('アイテムがゲットできませんでした.', error));
    });
};
