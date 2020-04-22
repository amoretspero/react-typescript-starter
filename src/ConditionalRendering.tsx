/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #7: Conditional Rendering */

import React, { useState } from "react";

/**
 * In React, you can create distinct components that encapsulate behavior you need.
 * Then, you can render only some of them, depending on the state of you application.
 */

/**
 * Component that greets already signed-up user.
 */
function UserGreeting() {
    return <h1>Welcome back!</h1>;
}

/**
 * Component that greets guest user, who needs to sign-up.
 */
function GuestGreeting() {
    return <h1>Please sign up.</h1>;
}

/**
 * Interface for `Greeting` component.
 */
interface IGreetingProps {
    isLoggedIn: boolean;
}

/**
 * Conditional rendering in React works the same way conditions work in TypeScript.
 * Use TypeScript operators like `if` or the conditional operator to create elements representing the current state,
 * and let React update the UI to match them.
 * 
 * This `Greeting` component that displays either of these components depending on whether a user is logged in.
 * This example component renders a different greeting depending on the value of `isLoggedIn` prop.
 */
function Greeting(props: IGreetingProps) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

/**
 * Interface for `LoginButton` component.
 */
interface ILoginButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * Interface for `LogoutButton` component.
 */
interface ILogoutButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * Component that renders Login button, with `onClick` event, given by props.
 * @param props Props for this component.
 */
function LoginButton(props: ILoginButtonProps) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

/**
 * Component that renders Logout button, with `onClick` event, given by props.
 * @param props Props for this component.
 */
function LogoutButton(props: ILogoutButtonProps) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

/**
 * You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn't change.
 * 
 * Consider two new components, `LoginButton` and `LogoutButton` representing Logout and Login buttons.
 * By using these two, we will create a [stateful Component](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) called `LoginControl`.
 * 
 * It will render either `<LoginButton />` or `<LogoutButton />` depending on its current state.
 * It will also render a `<Greeting />` from the above code.
 */
function LoginControl() {
    const [loggedInState, setLoggedInState] = useState({ isLoggedIn: false });

    function handleLoginClick() {
        setLoggedInState({ isLoggedIn: true });
    }

    function handleLogoutClick() {
        setLoggedInState({ isLoggedIn: false });
    }

    let button: JSX.Element;
    if (loggedInState.isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }

    return (
        <div>
            <Greeting isLoggedIn={loggedInState.isLoggedIn} />
            {button}
        </div>
    );
}

/**
 * Interface for props of `Mailbox` component.
 */
interface IMailboxProps {
    unreadMessages: string[];
}

/**
 * While declaring a variable and using an `if` statement is a fine way to conditionally render a component, sometimes you might want to use a shorter syntax.
 * There are a few ways to inline conditions in TSX, explained below.
 */

/**
 * **Inline If with Logical && Operator**
 * 
 * You may [embed any expressions in TSX](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) by wrapping them in curly braces.
 * This includes the TypeScript logical `&&` operator. It can be handy for conditionally including an element like below `Mailbox` component.
 * 
 * It works because in TypeScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.
 * 
 * Therefore, if the condition is `true`, the element right after `&&` will appear in the output. If it is `false`, React will ignore and skip it.
 * 
 * **Inline If-Else with Conditional Operator**
 * 
 * Another method for conditionally rendering elements inline is to use the TypeSCript conditional operator `condition ? true : false`.
 * 
 * In the example code in `Mailbox` component, we used it to conditionally render a small block of text.
 * 
 * It can also be used for larger expressions, although it may be less obvious what's going on.
 * 
 * Just like in TypeScript, it is up to you to choose an appropriate style based on what you and your team consider more readable.
 * Also remember that whenever conditions become too complex, it might be a good time to [extract a component](https://reactjs.org/docs/components-and-props.html#extracting-components).
 * 
 * @param props Props for this component.
 */
export function Mailbox(props: IMailboxProps) {
    const unreadMessages = props.unreadMessages;

    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages. - Rendered by && operator.
                </h2>
            }
            {unreadMessages.length > 0 ?
                <h2>You have {unreadMessages.length} unread messages. - Rendered by conditional operator.</h2> :
                <h2>You have no unread messages. - Rendered by conditional operator.</h2>
            }
        </div>
    );
}

/**
 * Interface for props of `WarningBanner` component.
 */
interface IWarningBannerProps {
    warn: boolean;
}

/**
 * Component that displays warning.
 * @param props Props for this component.
 */
function WarningBanner(props: IWarningBannerProps) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

/**
 * **Preventing Component from Rendering**
 * 
 * In rare cases, you might want a component to hide itself even though it was rendered by another component.
 * To do this, return `null` instaed of its render output.
 * 
 * In the example below, the `<WarningBanner />` is rendered depending on the value of the prop called `warn`.
 * If the value of the prop is `false`, then the component does not render.
 * 
 * Returning `null` from a component does not affect the firing of the component's lifecycle effects.
 */
export function Page() {
    const [warningState, setWarningState] = useState({ showWarning: true });

    function handleToggleClick() {
        setWarningState({ showWarning: !warningState.showWarning });
    }

    return (
        <div>
            <WarningBanner warn={warningState.showWarning} />
            <button onClick={handleToggleClick}>
                {warningState.showWarning ? "Hide" : "Show"}
            </button>
        </div>
    );
}
