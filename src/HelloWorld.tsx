/** React - Main Concepts - #1: Hello World */

import React from "react";

/**
 * The smallest example.
 * 
 * Below function will return <h1> element with "Hello, world!" inside it.
 * 
 * When rendered with
 * ```javascript
 * ReactDOM.render(
 *     <HelloWorld />,
 *     document.getElementById("root")
 * );
 * ```
 * it will display a heading saying "Hello, world!" on the page.
 * 
 * Above rendering code can be found in `index.tsx`.
 */
export function HelloWorld() {
    return <h1>Hello, world!</h1>;
}
