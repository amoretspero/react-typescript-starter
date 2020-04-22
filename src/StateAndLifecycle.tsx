/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #5: States And Lifecycle */

import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

/**
 * NOTE: For this example, `setInterval` function call will be wrapped,
 * to make sure any `setInterval` would not take place when this file is loaded.
 */

/**
 * Example from `RenderingElements.tsx`, the naive version of tick.
 * 
 * We call `ReactDOM.render()` to change the rendered output.
 */
function naiveTick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

/**
 * Naive-tick wrapper.
 */
function naiveTickWrapper() {
    setInterval(naiveTick, 1000);
}

/**
 * Interface for `Clock` component.
 */
interface INaiveClockProps {
    date: Date;
}

/**
 * Naive-clock, which only encapsulates what a clock should look like.
 * 
 * However, it misses a crucial requirement: the fact that the `Clock` sets up a timer and
 * updates the UI every second should be an implementation detail of the `Clock`.
 * 
 * Ideally, we want to write this once and have the `Clock` update itself:
 * ```javascript
 * ReactDOM.render(
 *     <Clock />,
 *     document.getElementById("root")
 * );
 * ```  
 * 
 * To implement this, we need to add "state" to the `Clock` component.
 * 
 * State is similar to props, but it is private and fully controlled by the component.
 * 
 * @param props Props for this component.
 */
function NaiveClock(props: INaiveClockProps) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

/**
 * Naive-clock wrapper.
 */
function naiveClockTick() {
    ReactDOM.render(
        <NaiveClock date={new Date()} />,
        document.getElementById("root")
    );
}

/**
 * NOTE: At the official documentation, conversion of a class to a function is introduced here.
 * 
 * But for the purpose of this example repository, we'll skip that and cling on to the functional component,
 * with the power of react-hooks!
 */

/**
 * The date-self-contained, but no-update clock.
 * 
 * Here, we use `useState` function, which "hooks" `date` variable to this component,
 * and gives `setDate` function to update the value of `date` variable.
 * 
 * @param props Props for this component.
 */
function NonUpdateClock() {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
    );
}

/**
 * Non-update clock wrapper.
 */
function NonUpdateClockWrapper() {
    ReactDOM.render(
        <NonUpdateClock />,
        document.getElementById("root")
    );
}

/**
 * The self-updating clock component.
 * 
 * Here, we also used `useEffect` function for making effect on this component.
 * 
 * When making effects without the need of clean-up, we use `useEffect` function with a function whose return type is `void` as argument.
 * Then React will make that effects in order of they are specified.
 * 
 * When making effects with the need of clean-up, we use `useEffect` with a function whose return type is also `function`, specifiying the clean-up as argument.
 * Then React will make that effects in order of they are specified, and calls the clean-up functions vice versa. 
 * 
 * @param props Props for this component.
 */
function SelfFormatClock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(timerID);
        };
    });

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
    );
}

/**
 * ## **Using `State` correctly**
 *
 * ### Do not modify state directly.
 *
 * For example, below code will not re-render a component.
 * ```javascript
 * // wrong
 * const [date, setDate] = useState(new Date());
 * date = new Date();
 * ```
 *
 * Instead, use the function returned by `useState` function.
 * ```javascript
 * const [date, setDate] = useState(new Date());
 * setDate(new Date());
 * ```
 *
 * ### State Updates May Be Asynchronous
 *
 * React may batch multiple state settings into a single update for performance.
 *
 * But react hooks' state can accept object, so if one wants to, one may use object typed state variables and update functions.
 * 
 * ### State Updates are Replaced (unlike class components, where state updates are merged.)
 * 
 * When you call state-updating function, react replaces the value you provide into the target state variable.
 */

/**
 * **The Data Flows Down**
 * 
 * Neither parent nor child components can know if a certain component is stateful or stateless,
 * and they shouldn't care whether it is defined as a function or a class.
 * 
 * This is why state is often called local or encapsulated.
 * It is not accessible to any component other than the one that owns and sets it.
 */

/**
 * Props interface for `FormattedDate` component.
 */
interface IFormattedDateProps {
    date: Date;
}

/**
 * Component that formats and displays date given in its props.
 * 
 * @param props Props for this component.
 */
function FormattedDate(props: IFormattedDateProps) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

/**
 * A component may choose to pass its state sown as props to its child components.
 * 
 * This `Clock` component passes `date` state to its child component `FormattedDate` as props.
 * The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand!
 * 
 * This is commonly called a "top-down" or "unidirectional" data flow.
 * Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.
 * 
 * If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.
 * 
 * `MultipleClock` component shows that all components ar truly isolated.
 * 
 * @param props Props for this component.
 */
export function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(timerID);
        };
    });

    return (
        <div>
            <h1>Hello, world!</h1>
            <FormattedDate date={date} />
        </div>
    );
}

/**
 * Component that renders 3 independent `Clock` components.
 * 
 * Each `Clock` sets up its own timer and updates independently.
 * 
 * In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time.
 * You can use stateless components inside stateful components, and vice versa.
 */
export function MultipleClock() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}
