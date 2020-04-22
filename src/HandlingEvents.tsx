/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #6: Handling Events */

import React, { useState } from "react";

/**
 * Fake effect function.
 */
function activateLasers() {
    console.log("Activaed lasers!");
}

/**
 * Handling events with React elements is very similar to handling events on DOM elements.
 * There are some syntax differences.
 * 
 * - React events are named using camelCase, rather than lowercase.
 * - With TSX you pass a function as the event handler, rather than a string.
 * 
 * For example, the HTML:
 * ```html
 * <button onclick="activateLasers()">
 *   Activate Lasers
 * </button>
 * ```
 * 
 * is slightly different in React, like below `buttonElement`.
 */
const buttonElement =
    <button onClick={activateLasers}>
        Activate Lasers
    </button>;

/**
 * Another difference is that you cannot return `false` to prevent default behavior in React.
 * You must call `preventDefault` explicitly.
 * 
 * For example, with plain HTML, to prevent the default link behavior of opening a new page, you can write:
 * ```html
 * <a href="#" onclick="console.log('The link was clicked.'); return false">
 *   Click me!
 * </a>
 * ```
 * 
 * In react, this could instead be like below element.
 * (Here, arrow function is used, but plain function is also fine.)
 */
const anchorElement =
    <a href="#" onClick={(e) => { e.preventDefault(); console.log("The link was clicked."); }}>
        Click me!
    </a>;

/**
 * This function can be used as `onClick`'s value of `anchorElement`.
 * 
 * Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/),
 * so you don't need to worry about cross-browser compatibility.
 * See the [SyntheticEvent](https://reactjs.org/docs/events.html) reference guide to learn more.
 * 
 * When using React, you generally don't need to call `addEventListener` to add listeners to a DOM element after it is created.
 * Instead, just provide a listener when the element is initially rendered.
 * 
 * @param e Mouse click event.
 */
function handleAnchorTagClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    console.log("The link was clicked.");
}

/**
 * `Button` element's `onClick` handler extracted as an isolated function.
 * @param state State of component that will be using this handler.
 * @param setState Set-state function for `state`.
 */
function handleToggleClickGenerator(state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) {
    return () => {
        setState(!state);
    };
}

/**
 * `Button` element's `onClick` handler extracted as an isolated function, with additional arguments.
 * @param state State of component that will be using this handler.
 * @param setState Set-state function for `state`.
 * @param prevState Additional argument.
 */
function handleToggleClickWithArgsGenerator(state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, prevState: boolean) {
    return () => {
        console.log(`Previous state: ${prevState}`);
        setState(!state);
    };
}

/**
 * When you define a component using react-hooks, a common pattern is for an event handler to be a function inside.
 * For example, below `Toggle` component renders a button that lets the user toggle between "ON" and "OFF" states.
 * 
 * Unlike ES6 class version of this component, one doesn't need to worry about `this` binding or other things.
 * 
 * Inside a loop, it is common to want to pass an extra parameter to an event handler.
 * For example, if `id` is the row ID, either of four `button` elements that will be rendered by `Toggle` component is valid.
 * 
 * For second and fourth cases, the `e` argument represents the React event representing mouse click event.
 * This event argument can be used when needed, like preventing default action or other cases.
 */
export function Toggle() {
    const [isToggleOn, setIsToggleOn] = useState(false);

    /**
     * This function is `onClick` event handler for `button` element.
     * 
     * This function can be extracted when needed to used somewhere else, like above `handleToggleClickGen`.
     */
    function handleToggleClick() {
        setIsToggleOn(!isToggleOn);
    }

    /**
     * This function is `onClick` event handler for `button` element, with additional arguments.
     * 
     * This function can be extracted when needed to used somewhere else, like above `handlerToggleClickWithArgsGen`.
     * @param prevState Additional arguments to be received by this handler.
     */
    function handleToggleClickWithArgs(prevState: boolean) {
        console.log(`Previous state: ${prevState}`);
        setIsToggleOn(!isToggleOn);
    }

    return (
        <div>
            <button onClick={handleToggleClick}>
                {isToggleOn ? "ON" : "OFF"}
            </button>
            <button onClick={(e) => { handleToggleClickWithArgs(isToggleOn); }}>
                {isToggleOn ? "ON" : "OFF"}
            </button>
            <button onClick={handleToggleClickWithArgsGenerator(isToggleOn, setIsToggleOn, isToggleOn)}>
                {isToggleOn ? "ON" : "OFF"}
            </button>
            <button onClick={(e) => { handleToggleClickWithArgs(isToggleOn); }}>
                {isToggleOn ? "ON" : "OFF"}
            </button>
        </div>
    );
}
