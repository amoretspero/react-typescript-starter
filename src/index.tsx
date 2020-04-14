import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";
import { HelloWorld } from "./HelloWorld";
import { IntroducingTsx } from "IntroducingTsx";
import { wrappedNaiveTick } from "RenderingElements";

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

wrappedNaiveTick();

//#endregion

//#endregion

