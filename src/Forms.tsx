/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #9: Forms */

import React, { useState } from "react";
import * as ReactDOM from "react-dom";

/**
 * ## Forms
 * 
 * HTML form elements work a little bit differently from other DOM elements in React, because form elements naturally keep some internal state.
 * For example, this form in plain HTML accepts a single name:
 * ```html
 * <form>
 *   <label>
 *     Name:
 *     <input type="text" name="name" />
 *   </label>
 *   <input type="submit" value="Submit" />
 * </form>
 * ```
 * 
 * This form has the default HTML form behavior of browsing to a new page when the user submits the form.
 * If you want this behavior in React, it just works.
 * But in most cases, it’s convenient to have a TypeScript function that handles the submission of the form and has access to the data that the user entered into the form.
 * The standard way to achieve this is with a technique called “controlled components”.
 */

/**
 * ## Controlled Components
 * 
 * In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input.
 * In React, mutable state is typically kept in the state property of components, and only updated with set-state function provided by `useState`.
 * (Or if you are using class component, the `setState` function.)
 * 
 * We can combine the two by making the React state be the “single source of truth”.
 * Then the React component that renders a form also controls what happens in that form on subsequent user input.
 * An input form element whose value is controlled by React in this way is called a “controlled component”.
 * 
 * This `NameForm` logs the name when it is submitted.
 * 
 * Since the `value` attribute is set on our form element, the displayed value will always be `state.value`,
 * making the React state the source of truth, hence making `NameForm` a "controlled component".
 * Since `handleChange` runs on every keystroke to update the React state, the displayed value will udate as the user types.
 * 
 * With a controlled component, the input’s value is always driven by the React state.
 * While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.
 */
export function NameForm() {
    const [state, setState] = useState({ value: "" });

    return (
        <form onSubmit={(e) => {
            alert(`A name was submitted: ${state.value}`);
            e.preventDefault();
        }}>
            <label>
                Name:
                <input type="text" value={state.value} onChange={(e) => setState({ value: e.target.value })} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

/**
 * ## The textarea Tag
 * 
 * In HTML, a `<textarea>` element defines its text by its children:
 * ```html
 * <textarea>
 *   Hello there, this is some text in a text area.
 * </textarea>
 * ```
 * 
 * In React, a `<textarea>` uses a `value` attribute instead.
 * This way, a form using a `<textarea>` can be written very similarly to a form that uses a single-line input.
 */
export function EssayForm() {
    const [state, setState] = useState({ value: "Please write an essay about your faborite DOM element." });

    return (
        <form onSubmit={(e) => {
            alert(`An essay was submitted: ${state.value}`);
            e.preventDefault();
        }}>
            <label>
                Essay:
                <textarea value={state.value} onChange={(e) => setState({ value: e.target.value })} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

/**
 * ## The select Tag
 * 
 * In HTML, `<select>` creates a drop-down list. For example, below HTML creates a drop-down list of flavors.
 * ```html
 * <select>
 *   <option value="grapefruit">Grapefruit</option>
 *   <option value="lime">Lime</option>
 *   <option selected value="coconut">Coconut</option>
 *   <option value="mango">Mango</option>
 * </select>
 * ```
 * 
 * Note that the Coconut option is initially selected, because of the `selected` attribute.
 * React, instead of using this `selected` attribute, uses a `value` attribute on the root `select` tag.
 * This is more convenient in a controlled component because you only need to update it in one place.
 * 
 * By using `value` attribute on root `select` tag, this makes it so that `<input type="text">`, `<textarea>` and `<select>` all work very similarly -
 * they all accept a `value` attribute that you can use to implement a controlled component.
 * 
 * When there is a need to allow multiple selections, just pass an array into the `select` tag's `value` attribute, and set `multiple` attribute to `true`:
 * ```javascript
 * <select multiple={true} value={["B", "C"]}>
 * ```
 */
export function FlavorForm() {
    const [state, setState] = useState({ value: "coconut" });

    return (
        <form onSubmit={(e) => {
            alert(`Your favorite flavor is: ${state.value}`);
            e.preventDefault();
        }}>
            <label>
                Pick your favorite flavor:
                <select value={state.value} onChange={(e) => setState({ value: e.target.value })}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

/**
 * ## The file input Tag.
 * 
 * In HTML, an `<input type="file">` lets the user choose one or more files from their device storage to be uploaded to a server,
 * or manipulated by JavaScript via the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).
 * ```html
 * <input type="file" />
 * ```
 * 
 * Because its value is read-only, it is an "uncontrolled component" in React.
 * It is discussed together with other uncontrolled components later in the documentation.
 */

/**
 * ## Handling Multiple Inputs
 * 
 * When you need to handle multiple controlled `input` elements,
 * you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.
 * 
 * Note how we used the ES6 [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) syntax
 * to update the state key corresponding to the given input name:
 * ```typescript
 * setState({
 *   [name]: value,
 * });
 * ```
 * 
 * Also, note that in `inputChangeHandler` function, since state-update function returned by `useState` will replace previous state,
 * we uses spread operator first to preserve state values that should not change, then apply new value with computed property name syntax.
 */
export function Reservation() {
    const [state, setState] = useState({
        isGoing: true,
        numberOfGuests: 2,
    });

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.name === "isGoing" ? target.checked : target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value,
        });
    }

    return (
        <form>
            <label>
                Is going:
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={state.isGoing}
                    onChange={inputChangeHandler} />
            </label>
            <br />
            <label>
                Number of guests:
                <input
                    name="numberOfGuests"
                    type="number"
                    value={state.numberOfGuests}
                    onChange={inputChangeHandler} />
            </label>
        </form>
    );
}

/**
 * ## Controlled Input Null Value
 * 
 * Specifying the value prop on a "controlled component" prevents the user from changing the input unless you desire so.
 * If you've specified a `value` but the input is still editable, you may have accidentally set `value` to `undefined` of `null`.
 * 
 * When this `delayedEditableInput` function is called,
 * `input` element with `value` specified with non-null, defined value is rendered, so not editable.
 * Then after 3000ms, it will be editable since `input` element will be re-rendered with value set to `undefined`.
 * 
 * NOTE: Though the official documentation uses `null` for `value`,
 * as we are using TypeScript, and because `value` type is forced by type definitions of React to `string | number | string[] | undefined`,
 * here we use `undefined` for example source code.
 */
export function delayedEditableInput(mountNodeId: string) {
    ReactDOM.render(<input value="hi" />, document.getElementById(mountNodeId));

    setTimeout(() => {
        ReactDOM.render(<input value={undefined} />, document.getElementById(mountNodeId));
    }, 3000);
}

/**
 * ## Alternatives to Controlled Components
 *
 * It can sometimes be tedious to use controlled components,
 * because you need to write an event handler for every way your data can change and pipe all of the input state through a React component.
 * This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library.
 * In these situations, you might want to check out "uncontrolled components", an alternative technique for implementing input forms.
 * "Uncontrolled components" will be dealt in later examples.
 */

/**
 * ## Fully-Fledged Solutions
 *
 * If you’re looking for a complete solution including validation, keeping track of the visited fields, and handling form submission,
 * [Formik](https://jaredpalmer.com/formik) is one of the popular choices.
 * However, it is built on the same principles of controlled components and managing state — so don’t neglect to learn them.
 */
