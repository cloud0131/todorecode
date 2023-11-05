import React from "react";

export const ListItem = (props:User) => {
    const { id, Todo, limittime, comptime } = props;
    return (
        <p>{id}{Todo} {limittime} {comptime} </p>);

};