/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #2: Introducing TSX */

import React from "react";

/**
 * This syntax is called JSX. Of course, when in typescript, called TSX.
 * 
 * JSX(TSX) is a syntax extension to Javascript(Typescript)
 */
const tsxElement = <h1>Hello, world!</h1>;

const name = "Josh Perez";

/**
 * String typed variable `name` can be used inside of TSX, by wrapping it in curly braces.
 * 
 * Any valid typescript expression can be placed inside of curly braces in TSX.
 * For example, `2 + 2`, `user.firstName`, `formatName(user)` are all valid expressions that can be put inside of TSX.
 * 
 * You can think that given expression is first evaluated, then take its stringified form when takes place in TSX.
 * 
 * TSX can prevent injection attacks, by used with curly braces.
 */
const nameElement = <h1>Hello, {name}</h1>;

/**
 * User interface.
 */
interface IUser {
    firstName: string;
    lastName: string;
}

/**
 * Formats user's name to string.
 * @param user User to format name.
 */
function formatName(user: IUser): string {
    return `${user.firstName} ${user.lastName}`;
}

/**
 * Test user.
 */
const user: IUser = {
    firstName: "Harper",
    lastName: "Perez"
};

/**
 * Element that result of calling typescript function `formatName` will be embedded in TSX.
 */
const element = (
    <h1>
        Hello, {formatName(user)}
    </h1>
);

/**
 * A function that returns greeting for given user, as TSX.
 * 
 * We can think TSX as an typescript expression.
 * TSX can be used inside of `if` statements and `for` loops, assigned to variables,
 * accepted as arguments and returned.
 * @param user User to greet.
 */
function getGreeting(user?: IUser) {
    if (user) {
        return <h3>Hello, {formatName(user)}!</h3>;
    }
    return <h3>Hello, Stranger.</h3>;
}

/**
 * <img> element with `src` attribute specified.
 * 
 * One can use quotes to specify string literals as attributes.(ex: `<div tabIndex="0"></div>`)
 * 
 * One also can use curly braces to embed a Typescript expression in an attribute.(ex: See below.)
 */
const imgElement = <img src={"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"} />;

/**
 * TSX wrap-up element.
 * 
 * TSX tags may contain children, as `div` element in below code does.
 */
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

/**
 * Below two element is exactly the same.
 * 
 * `elementWithTsx` is created with TSX, where `elementWithCreateElement` is created with explicit call to `createElement` function from react.
 * 
 * TSX is recommended for some reasons. For detailed explanation, please see https://reactjs.org/docs/introducing-jsx.html#why-jsx
 */

/**
 * Element created with TSX.
 */
const elementWithTsx = <h1 className="greeting">Hello, world!</h1>;

/**
 * Element created with `createElement` function.
 */
const elementWithCreateElement = React.createElement("h1", { className: "greeting" }, "Hello, world!");
