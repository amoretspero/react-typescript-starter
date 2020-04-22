/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #4: Components and Props */

import React from "react";

/**
 * Components lets you split the UI into independent, reusable pieces, and think abount each piece in isolation.
 *
 * This code provides an introduction to the idea of components.
 *
 * Detailed component API reference can be found at: https://reactjs.org/docs/react-component.html
 */

/**
 * Conceptually, components are like Typescript(Javascript) functions.
 * They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.
 */

/**
 * Interface for props of `Welcome` component.
 */
interface WelcomeProps {
    name: string;
}

/**
 * The simplest way to define a component, by defining Typescript function.
 * 
 * This function is a valid React component, because
 *      1. It accepts a single `props` (which stands for "properties") object argument with data,
 *      2. And returns a React element.
 * 
 * We call component like this as "functional components" because they are literally Typescript functions.
 * 
 * One may use ES6 class to define a component like `WelcomeClassComponent` below.
 * 
 * For this starter example codes, we will use functional components, but when needed, class version of components will be provided.
 * 
 * NOTE: Always start component names with a capital letter. React considers lowercase-started components as DOM tags.
 * 
 * @param props Props for this component.
 */
function Welcome(props: WelcomeProps) {
    return <h1>Hello, {props.name}</h1>;
}

/**
 * ES6 class version of `Welcome` component. Two are exactly the same.
 */
class WelcomeClassComponent extends React.Component<WelcomeProps, {}> {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

/**
 * Elements can also represent user-defined components.
 */
const welcomeElement = <Welcome name="Sara" />;

/**
 * Components can refer to other components in their output.
 * This lets us use the same component abstraction for any level of detail.
 * A button, a form, a screen: in React apps, all those are commonly expressed as components.
 * 
 * This `WelcomeApp` component refers to `Welcome` component many times.
 */
function WelcomeApp() {
    return (
        <div>
            {welcomeElement}
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

/**
 * Interface for author information.
 */
interface IAuthor {
    avatarUrl: string;
    name: string;
}

/**
 * Interface for comment information.
 */
interface ICommentProps {
    author: IAuthor;
    text: string;
    date: Date;
}

/**
 * Formats date into year-month-date form.
 * @param date Date to format.
 */
function formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/**
 * Naive-comment component, which its child components are not properly extracted.
 * @param props Props for this component.
 */
function NaiveComment(props: ICommentProps) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

/**
 * Generic user interface.
 */
interface IUser {
    avatarUrl: string;
    name: string;
}

/**
 * Type for `Avatar` component's props.
 * 
 * This is same with `IAuthor`, but for generality, we go with name `user`.
 */
interface IAvatarProps {
    user: IUser;
}

/**
 * Extracted avatar component.
 * @param props Props for this component.
 */
function Avatar(props: IAvatarProps) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

/**
 * Comment component with `Avatar` extracted and abstracted from `NaiveComment`
 * @param props Props for this component.
 */
function AvatarExtractedComment(props: ICommentProps) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <Avatar user={props.author} />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

/**
 * Type for `UserInfo` component's props.
 */
interface IUserInfoProps {
    user: IUser;
}

/**
 * Extracted user information component.
 * @param props Props for this component.
 */
function UserInfo(props: IUserInfoProps) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

/**
 * User information extracted comment component.
 * 
 * Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps.
 * A good rule of thumb is that if a part of your UI is used several times(`Button`, `Panel`, `Avater`, etc.), or is complex enough on its own(`App`, `FeedStory`, `Comment`, etc.),
 * it is a good candidate to be a reusable component.
 * 
 * @param props Props for this component.
 */
export function Comment(props: ICommentProps) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

/**
 * Simple function that performs addition.
 * 
 * Functions like this are called `pure` functions, in sense of that they do not attempt to change their inputs, and always return th esame result for the same inputs.
 * 
 * @param a Number to add.(right-side)
 * @param b Number to add.(left-side)
 */
function sum(a: number, b: number) {
    return a + b;
}

/**
 * Simple function that performs withdrawl of money from account.
 * 
 * In contrast with functions like `sum`, functions like this is called `impure` functions, since they changes their own input.
 * 
 * @param account Account to withdraw from.
 * @param amount Amount to withdraw.
 */
function withdraw(account: { total: number }, amount: number) {
    account.total -= amount;
}

/**
 * React is pretty flexible but it has a single strict rule:
 *
 * **All React components must act like pure functions with respect to their props.**
 *
 * Of course, application UIs are dynamic and change over time. In next example code, we will introduce a new concept of "state".
 * State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
 */
