/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #8: List and Keys */

import React from "react";

/**
 * Numbers from 1 to 5.
 */
const numbers = [1, 2, 3, 4, 5];

/**
 * We use `map()` function to take an array of `numbers` and double their values.
 * We assign the new array returned by `map()` to the variable `doubled`.
 * 
 * `doubled` will be equal to `[2, 4, 6, 8, 10]`.
 * 
 * In React, transforming arrays tinto lists of elements is nearly identical.
 */
const doubled = numbers.map((number) => number * 2);

/**
 * **Rendering Multiple Components**
 * 
 * You can build collections of elements and include them in TSX using curly braces.
 * 
 * Below, we loop through the numbers array using the Typescript `map()` function.
 * We return a `<li>` element for each item. Finally, we assign the resulting array of elements to `listItems`.
 * 
 * And we may include the entire `listItems` array inside a `<ul>` element, and render it to the DOM like below:
 * ```javascript
 * ReactDOM.render(
 *   <ul>{listItems}</ul>,
 *   document.getElementById("root")
 * );
 * ```
 * 
 * Above code displays a bullet list of numbers between 1 and 5.
 */
// eslint-disable-next-line react/jsx-key
const listItems = numbers.map((number) => <li>{number}</li>);

/**
 * Interface for props of `NumberList` component.
 */
interface INumberListProps {
    numbers: number[];
}

/**
 * **Basic List Component**
 * 
 * Usually you would render lists inside a component.
 * 
 * We can refactor the previous example into a component that accepts an array of numbers and outputs a list of elements.
 * 
 * When you run this `NumberListWithoutKey` function with below code:
 * ```javascript
 * const numbers = [1, 2, 3, 4, 5];
 * ReactDOM.render(
 *   <NumberListWithoutKey numbers={numbers} />,
 *   document.getElementById("root")
 * );
 * ```
 * you'll be given a warning that a key should be provided for list items.(Suppressed by 'eslint-disable-next-line react/jsx-key' directive here.)
 * 
 * A "key" is a special string attribute you need to include when creating lists of elements.
 * We'll discuss why it's important in the next section.
 * 
 * @param props Props for this component.
 */
function NumberListWithoutKey(props: INumberListProps) {
    const numbers = props.numbers;
    // eslint-disable-next-line react/jsx-key
    const listItems = numbers.map((number) => <li>{number}</li>);

    return (
        <ul>{listItems}</ul>
    );
}

/**
 * `NumberList` with proper `key`.
 * 
 * @param props Props for this component.
 */
function NumberListWithKey(props: INumberListProps) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);

    return (
        <ul>{listItems}</ul>
    );
}

/**
 * Sample data for `todoItems`.
 */
const todos = [
    {
        id: "1",
        text: "study react",
    },
    {
        id: "2",
        text: "bake some cookies",
    },
    {
        id: "3",
        text: "practice violin",
    },
];

/**
 * ##Key
 * 
 * Keys help React identify which items have changed, are added, or are removed.
 * Keys should be given to the elements inside the array to give the elements a stable identity.
 * 
 * The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.
 * Most often you would use IDs from your data as keys.
 */
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);

/**
 * When you don't have stable IDs for rendered items, you may use the item index as a key as a last resort.
 * 
 * We don’t recommend using indexes for keys if the order of items may change.
 * This can negatively impact performance and may cause issues with component state.
 * Check out Robin Pokorny’s article for an [in-depth explanation on the negative impacts of using an index as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318).
 * If you choose not to assign an explicit key to list items then React will default to using indexes as keys. 
 * 
 * Here is an [in-depth explanation about why keys are necessary](https://reactjs.org/docs/reconciliation.html#recursing-on-children) if you’re interested in learning more.
 */
const todoItemsWithListIdxAsKey = todos.map((todo, idx) => <li key={idx.toString()}>{todo.text}</li>);

/**
 * Interface for props of `ListItem` component.
 */
interface IListItemProps {
    value: number;
}

/**
 * List item with wrongly placed key attribute.
 * @param props Props for this component.
 */
function WrongKeyListItem(props: IListItemProps) {
    const value = props.value;
    return (
        // Wrong! There is no need to specify the key here:
        <li key={value.toString()}>
            {value}
        </li>
    );
}

/**
 * Number list with wrongly placed key attribute.
 * @param props Props for this component.
 */
function WrongKeyNumberList(props: INumberListProps) {
    const numbers = props.numbers;

    // Wrong! The key should have been specified here:
    // eslint-disable-next-line react/jsx-key
    const listItems = numbers.map((number) => <WrongKeyListItem value={number} />);

    return (
        <ul>
            {listItems}
        </ul>
    );
}

/**
 * List item with correctly placed key attribute.
 * @param props Props for this component.
 */
function CorrectKeyListItem(props: IListItemProps) {
    return <li>{props.value}</li>;
}

/**
 * Number list with correctly placed key attribute.
 * 
 * A good rule of thumb is that elements inside the `map()` call need keys.
 * 
 * @param props Props for this component.
 */
function CorrectKeyNumberList(props: INumberListProps) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <CorrectKeyListItem key={number.toString()} value={number} />);

    return (
        <ul>
            {listItems}
        </ul>
    );
}

/**
 * Sample data for `Blog` component.
 * 
 * May use by:
 * ```javascript
 * ReactDOM.render(
 *   <Blog posts={posts} />,
 *  document.getElementById("root")
 * );
 * ```
 */
const posts = [
    { id: 1, title: "Hello World", content: "Welcome to learning React!" },
    { id: 2, title: "Installation", content: "You can install React from npm." }
];

/**
 * Interface for props of `Blog` component.
 */
interface IBlogProps {
    posts: Array<{ id: number; title: string; content: string }>;
}

/**
 * **Keys Must Only Be Unique Among Siblings**
 * 
 * Keys used within arrays should be unique among their siblings.
 * However they don't need to be globally unique.
 * We can use the same keys when we produce two different arrays.
 * 
 * For `Blog` component, `post.id` serves as key for both `sidebar` and `content`.
 * 
 * Keys serve as a hint to React but they don't get passed to your components.
 * If you need the same value in your component, pass it explicitly as a prop with a different name like below
 * ```javascript
 * const content = posts.map((post) =>
 *   <Post
 *     key={post.id}
 *     id={post.id}
 *     title={post.title} />
 * );
 * ```
 * With example above, the `Post` component can read `props.id`, but not `props.key`.
 * 
 * @param props Props for this component.
 */
export function Blog(props: IBlogProps) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

/**
 * List item for `NumberList`.
 * @param props Props for this component.
 */
function ListItem(props: IListItemProps) {
    return <li>{props.value}</li>;
}

/**
 * Component that renders bullet list of numbers.
 * 
 * In the examples above, we declared a separate `listItems` variable and included it in TSX.
 * 
 * TSX also allows embedding any expression in curly braces so we could inline the `map()` result.
 * 
 * Sometimes this results in clearer code, but this style can also be abused.
 * Like in TypeScript, it is up to you to decide whether it is worth extracting a variable for readability.
 * Keep in mind that if the `map()` body is too nested, it might be a good time to extract a component.
 * 
 * @param props Props for this component.
 */
export function NumberList(props: INumberListProps) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) => <ListItem key={number.toString()} value={number} />)}
        </ul>
    );
}
