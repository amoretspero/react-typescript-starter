/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";
import { HelloWorld } from "./HelloWorld";
import { IntroducingTsx } from "IntroducingTsx";
import { wrappedNaiveTick } from "RenderingElements";
import { Comment } from "ComponentsAndProps";
import { Clock, MultipleClock } from "StateAndLifecycle";
import { Toggle } from "HandlingEvents";
import { Mailbox, Page } from "ConditionalRendering";
import { Blog, NumberList } from "ListsAndKeys";

//#region react-dom-render

//#region boilerplate-app

// ReactDOM.render(
//     <App world="world" />,
//     document.getElementById("root"),
// );

//#endregion

//#region helloworld

// ReactDOM.render(
//     <HelloWorld />,
//     document.getElementById("root"),
// );

//#endregion

//#region introducing-tsx

// ReactDOM.render(
//     <IntroducingTsx />,
//     document.getElementById("root"),
// );

//#endregion

//#region rendering-element

// wrappedNaiveTick();

//#endregion

//#region components-and-props

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

// ReactDOM.render(
//     <div>
//         <Toggle />
//     </div>,
//     document.getElementById("root"),
// );

//#endregion

//#region conditional-rendering

// ReactDOM.render(
//     <div>
//         <Mailbox unreadMessages={["hello", "world"]} />
//         <Page />
//     </div>,
//     document.getElementById("root"),
// );

//#endregion

//#region lists-and-keys

const posts = [
    { id: 1, title: "Hello World", content: "Welcome to learning React!" },
    { id: 2, title: "Installation", content: "You can install React from npm." }
];

const numbers = [1, 2, 3, 4, 5];

ReactDOM.render(
    <div>
        <Blog posts={posts} />
        <hr />
        <NumberList numbers={numbers} />
    </div>,
    document.getElementById("root"),
);

//#endregion

//#endregion

