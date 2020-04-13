import React from "react";

import "./app.css";

export function App(props: { world?: string }) {
    return (
        <div className="app">
            Hello, {props.world || "world"}!
        </div>
    );
}


