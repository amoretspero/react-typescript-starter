/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #3: Rendering Elements */

import React from "react";
import * as ReactDOM from "react-dom";

/**
 * An element describes what you want to see on the screen.
 * 
 * However, unlike browser DOM elements, React elements are plain objects, and are cheap to create.
 * (As seen in `IntroducingTsx.tsx` file.)
 * 
 * With below DOM element some where in HTML code, (`id` may not be "root", write whatever you want. But "root" is some what standard naming convention.)
 * ```html
 * <div id="root"></div>
 * ```
 * We call this element the "root" DOM element, when used like
 * ```javascript
 * ReactDOM.render(helloWorldElement, document.getElementById("root"));
 * ```
 * because everything inside it will be managed by React DOM.
 * 
 * Applications built with just React usually have a single root DOM node.
 * 
 * When integrated into existing app, one may have many isolated root DOM nodes as one like.
 * 
 * NOTE: Do not confuse `components` with `elements`. `elements` are what `component` is made of, and `component` is more broad concept.
 */
const helloWorldElement = <h1>Hello, world!</h1>;

/**
 * A naive ticking clock, which ticks every 1 second, by re-rendering whole React DOM.
 * 
 * But, react will care that, since react only updates what's necessary.
 * 
 * React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.
 * 
 * Even though `naiveTick` creates element describing the whole UI tree on every tick, only the text node whose contents have changed gets updated by React DOM.
 * One can verify that with browser tools.
 * 
 * (To see, replace `react-dom-render` region's code in `index.tsx` with below `naiveTick` and `setInterval(naiveTick, 1000)`, or just call `wrappedNaiveTick`.)
 */
function naiveTick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById("root"));
}

// setInterval(naiveTick, 1000);

/**
 * Wrapped `naiveTick` function.
 */
export function wrappedNaiveTick() {
    return setInterval(naiveTick, 1000);
}
