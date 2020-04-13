import React from "react";

// const element = <h1>Hello, world!</h1>;

// const name = "Josh Perez";
// const nameElement = <h1>Hello, {name}</h1>;

interface IUser {
    firstName: string;
    lastName: string;
}

function formatName(user: IUser): string {
    return `${user.firstName} ${user.lastName}`;
}

const user: IUser = {
    firstName: "Harper",
    lastName: "Perez"
};

const element = (
    <h1>
        Hello, {formatName(user)}
    </h1>
);

function getGreeting(user?: IUser) {
    if (user) {
        return <h3>Hello, {formatName(user)}!</h3>;
    }
    return <h3>Hello, Stranger.</h3>;
}

const imgElement = <img src={"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"} />;

export function IntroducingTsx() {
    return (
        <div>
            {element}
            <h2>
                This is inline element!
            </h2>
            {getGreeting(user)}
            {imgElement}
        </div>
    );
}
