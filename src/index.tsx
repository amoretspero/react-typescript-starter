/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";
import { HelloWorld } from "./HelloWorld";
import { IntroducingTsx } from "./IntroducingTsx";
import { wrappedNaiveTick } from "./RenderingElements";
import { Comment } from "./ComponentsAndProps";
import { Clock, MultipleClock } from "./StateAndLifecycle";
import { Toggle } from "./HandlingEvents";
import { Mailbox, Page } from "./ConditionalRendering";
import { Blog, NumberList } from "ListsAndKeys";
import { EssayForm, FlavorForm, NameForm, Reservation, delayedEditableInput } from "./Forms";

//#region react-dom-render

//#region boilerplate-app

// ReactDOM.render(
//     <App world="world" />,
//     document.getElementById("root"),
// );

//#endregion

//#region helloworld

/** React - Main Concepts - #1: Hello World */

// ReactDOM.render(
//     <HelloWorld />,
//     document.getElementById("root"),
// );

//#endregion

//#region introducing-tsx

/** React - Main Concepts - #2: Introducing TSX */

// ReactDOM.render(
//     <IntroducingTsx />,
//     document.getElementById("root"),
// );

//#endregion

//#region rendering-element

/** React - Main Concepts - #3: Rendering Elements */

// wrappedNaiveTick();

//#endregion

//#region components-and-props

/** React - Main Concepts - #4: Components and Props */

// ReactDOM.render(
//     <Comment
//         author={{
//             name: "amoretspero",
//             avatarUrl: "https://avatars0.githubusercontent.com/u/10436009?s=400&u=20101aac67d51343d1ffcf794e2d717adf14ef10&v=4",
//         }}
//         date={new Date(2020, 4, 15, 9, 0, 0)}
//         text="Hello, world!"
//     />,
//     document.getElementById("root")
// );

//#endregion

//#region state-and-lifecycle

/** React - Main Concepts - #5: State and Lifecycle */

// ReactDOM.render(
//     <div>
//         <div>
//             <h2>The first single clock:</h2>
//             <Clock />
//         </div>
//         <div>
//             <h2>The second single clock:</h2>
//             <Clock />
//         </div>
//         <div>
//             <h2>The multiple(3) clocks:</h2>
//             <MultipleClock />
//         </div>
//     </div>,
//     document.getElementById("root"),
// );

//#endregion

//#region handling-events

/** React - Main Concepts - #6: Handling Events */

// ReactDOM.render(
//     <div>
//         <Toggle />
//     </div>,
//     document.getElementById("root"),
// );

//#endregion

//#region conditional-rendering

/** React - Main Concepts - #7: Conditional Rendering */

// ReactDOM.render(
//     <div>
//         <Mailbox unreadMessages={["hello", "world"]} />
//         <Page />
//     </div>,
//     document.getElementById("root"),
// );

//#endregion

//#region lists-and-keys

/** React - Main Concepts - #8: Lists and Keys */

// const posts = [
//     { id: 1, title: "Hello World", content: "Welcome to learning React!" },
//     { id: 2, title: "Installation", content: "You can install React from npm." }
// ];

// const numbers = [1, 2, 3, 4, 5];

// ReactDOM.render(
//     <div>
//         <Blog posts={posts} />
//         <hr />
//         <NumberList numbers={numbers} />
//     </div>,
//     document.getElementById("root"),
// );

//#endregion

//#region forms

/** React - Main Concepts - #9: Forms */

ReactDOM.render(
    <div>
        <NameForm />
        <hr />
        <EssayForm />
        <hr />
        <FlavorForm />
        <hr />
        <Reservation />
        <hr />
        <div id="delayed-editabel-input-region"></div>
    </div>,
    document.getElementById("root"),
);

delayedEditableInput("delayed-editabel-input-region");

//#endregion    
