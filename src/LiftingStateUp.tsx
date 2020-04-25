/* eslint-disable @typescript-eslint/no-unused-vars */

/** React - Main Concepts - #10: Lifting State Up */

import React, { useState } from "react";

/**
 * Often, several components need to reflect the same changing data.
 * We recommend lifting the shared state up to their closest common ancestor.
 * Let’s see how this works in action.
 * 
 * In this section, we will create a temperature calculator that calculates whether the water would boil at a given temperature.
 */

/**
 * Interface for props of `BoilingVerdict` component.
 */
interface IBoilingVerdictProps {
    celcius: number;
}

/**
 * We will start with a component called `BoilingVerdict`.
 * It accepts the `celsius` temperature as a prop, and prints whether it is enough to boil the water.
 * @param props Props for this component.
 */
function BoilingVerdict(props: IBoilingVerdictProps) {
    if (props.celcius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The wather would not boil.</p>;
}

/**
 * Next, we will create a component called `Calculator`.
 * It renders an `<input>` that lets you enter the temperature, and keeps its value in `state.temperature`.
 * Additionally, it renders the `BoilingVerdict` for the current input value.
 */
function CelsiusOnlyCalculator() {
    const [state, setState] = useState({ temperature: "" });

    return (
        <fieldset>
            <legend>Enter temperature in Celsius:</legend>
            <input
                value={state.temperature}
                onChange={(e) => { setState({ temperature: e.target.value }); }} />
            <BoilingVerdict
                celcius={parseFloat(state.temperature)} />
        </fieldset>
    );
}

/**
 * Temperature scale names.
 */
enum ScaleNames {
    Celsius = "Celsius",
    Fahrenheit = "Fahrenheit",
}

/**
 * Interface for props of `TemperatureInput` component.
 */
interface IControlledTemperatureInputProps {
    scale: ScaleNames;
}

/**
 * **Adding a Second Input**
 * 
 * Our new requirement is that, in addition to a Celsius input, we provide a Fahrenheit input, and they are kept in sync.
 * 
 * We can start by extracting a `TemperatureInput` component from `CelsiusOnlyCalculator`.
 * We will add a new `scale` prop to it that can either be `Celsius` or `Fahrenheit`.
 * 
 * @param props Props for this component.
 */
function ControlledTemperatureInput(props: IControlledTemperatureInputProps) {
    const [state, setState] = useState({ temperature: "" });

    const temperature = state.temperature;
    const scale = props.scale;

    return (
        <fieldset>
            <legend>Enter temperature in {scale}:</legend>
            <input
                value={temperature}
                onChange={(e) => setState({ temperature: e.target.value })} />
        </fieldset>
    );
}

/**
 * We can now change the `CelsiusOnlyCalculator` to render two separate temperature inputs.
 * 
 * We have two inputs now, but when you enter the temperature in one of them, the other doesn’t update.
 * This contradicts our requirement: we want to keep them in sync.
 * 
 * We also can't display the `BoilingVerdict` from `UncontrollingCalculator`.
 * The `UncontrollingCalculator` doesn't know the current temperature because it is hidden inside the `ControlledTemperatureInput`.
 */
function UncontrollingCalculator() {
    return (
        <div>
            <ControlledTemperatureInput scale={ScaleNames.Celsius} />
            <ControlledTemperatureInput scale={ScaleNames.Fahrenheit} />
        </div>
    );
}

/**
 * **Writing Conversion Functions**
 * 
 * First, we will write two functions to convert from Celsius to Fahrenheit and back.
 * 
 * Below two functions convert numbers.(`toCelsius` and `toFahrenheit`)
 * 
 * 
 * We will write another function that takes a string `temperature` and a converter function as arguments and returns a string.
 * We will use it to calculate the value of one input based on the other input.
 * It returns an empty string on an invalid `temperature`, and it keeps the output rounded to the third decimal place.
 * `tryConvert` function is what we need, which `tryConvert("abc", toCelsius)` will return an empty string,
 * and `tryConvert("10.22", toFahrenheit)` will return `"50.396".
 */

/**
 * Calculates temperature in celsius for given fahrenheit-scaled temperature.
 * @param fahrenheit Temperature in fahrenheit scale.
 */
function toCelsius(fahrenheit: number) {
    return (fahrenheit - 32) * 5 / 9;
}

/**
 * Calculates temperature in fahrenheit for given celsius-scaled temperature.
 * @param celsius Temperature in fahrenheit scale.
 */
function toFahrenheit(celsius: number) {
    return (celsius * 9 / 5) + 32;
}

/**
 * Converts given string-valued temperature to target scale's temperature, in string type.
 * @param temperature String-valued temperature to convert to number.
 * @param convert Convert function.
 */
function tryConvert(temperature: string, convert: (number: number) => number) {
    const input = parseFloat(temperature);
    if (isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

/**
 * Interface for props of `TemperatureInput` component.
 */
interface ITemperatureInputProps {
    temperature: string;
    scale: ScaleNames;
    onTemperatureChange: (temperature: string) => void;
}

/**
 * **Lifting State Up**
 * 
 * Currently, both `ControlledTemperatureInput` components independently keep their values in the local state.
 * 
 * However, we want these two inputs to be in sync with each other.
 * When we update the Celsius input, the Fahrenheit input should reflect the converted temperature, and vice versa.
 * 
 * In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
 * This is called “lifting state up”.
 * We will remove the local state from the `ControlledTemperatureInput` and move it into the `UncontrollingCalculator` instead.
 * 
 * If the `UncontrollingCalculator` owns the shared state, it becomes the “source of truth” for the current temperature in both inputs.
 * It can instruct them both to have values that are consistent with each other.
 * Since the props of both `ControlledTemperatureInput` components are coming from the same parent `UncontrollingCalculator` component,
 * the two inputs will always be in sync.
 * 
 * Let's see how this works step by step.
 * 
 * First, we will replace `state.temperature` with `props.temperature` in the `ControlledTemperatureInput` component.
 * 
 * We known that props are read-only.
 * When the `temperature` was in the local state, the `ControlledTemperatureInput` could just call `setState` to change it.
 * However, now that the `temperature` is coming from the parent as a prop,
 * the `ControlledTemperatureInput` has no control over it.
 * 
 * In React, this is usually solved by making a component "controlled".
 * Just like the DOM `<input>` accepts both a `value` and an `onChange` prop,
 * so can the custom `ControlledTemperatureInput` accepts both `temperature` and `onTemperatureChange` props from its parent `UncontrollingCalculator`.
 * 
 * Now, when the `ControlledTemperatureInput` wants to update its temperature, it should call `props.onTemperatureChange`.
 * 
 * The `onTemperatureChange` prop will be provided together with the `temperature` prop by the parent `UncontrollingCalculator` component.
 * It will handle the change by modifying its own local state, thus re-rendering both inputs with the new values.
 * We will look at the new UncontrollingCalculator implementation very soon.
 * 
 * Before diving into the changes in the `UncontrollingCalculator`, let’s recap our changes to the `ControlledTemperatureInput` component.
 * We have removed the local state from it, and instead of reading `state.temperature`, we now read `props.temperature`.
 * Instead of calling `setState()` when we want to make a change, we now call `props.onTemperatureChange()`,
 * which will be provided by the `UncontrollingCalculator`:
 */
function TemperatureInput(props: ITemperatureInputProps) {
    const temperature = props.temperature;
    const scale = props.scale;

    return (
        <fieldset>
            <legend>Enter temperature in {scale}:</legend>
            <input
                value={temperature}
                onChange={(e) => { props.onTemperatureChange(e.target.value); }} />
        </fieldset>
    );
}

/**
 * Now let's turn to the `Calculator` component.
 * 
 * We will store the current input’s `temperature` and `scale` in its local state.
 * This is the state we “lifted up” from the inputs, and it will serve as the “source of truth” for both of them.
 * It is the minimal representation of all the data we need to know in order to render both inputs.
 * 
 * For example, if we enter 37 into the Celsius input, the state of the `Calculator` component will be:
 * ```javascript
 * {
 *   temperature: "37",
 *   scale: ScaleNames.Celsius
 * }
 * ```
 * 
 * If we later edit the Fahrenheit field to be 212, the state of the `Calculator` will be:
 * ```javascript
 * {
 *   temperature: "212",
 *   scale: ScaleNames.Fahrenheit
 * }
 * ```
 * 
 * We could have stored the value of both inputs but it turns out to be unnecessary.
 * It is enough to store the value of the most recently changed input, and the scale that it represents.
 * We can then infer the value of the other input based on the current `temperature` and `scale` alone.
 * 
 * The inputs stay in sync because their values are computed from the same state.
 * 
 * Now no matter which input you edit, `state.temperature` and `state.scale` in the `Calculator` get updated.
 * One of the inputs gets the value as is, so any user input is preserved, and the other input value is always recalculated based on it.
 */
export function Calculator() {
    const [state, setState] = useState({ temperature: "", scale: ScaleNames.Celsius });

    const scale = state.scale;
    const temperature = state.temperature;
    const celsius = scale === ScaleNames.Fahrenheit ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === ScaleNames.Celsius ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput
                scale={ScaleNames.Celsius}
                temperature={celsius}
                onTemperatureChange={(temperature) => setState({ scale: ScaleNames.Celsius, temperature })} />
            <TemperatureInput
                scale={ScaleNames.Fahrenheit}
                temperature={fahrenheit}
                onTemperatureChange={(temperature) => setState({ scale: ScaleNames.Fahrenheit, temperature })} />
            <BoilingVerdict
                celcius={parseFloat(celsius)} />
        </div>
    );
}

/**
 * Let's recap what happens when you edit an input:
 *
 * - React calls the function specified as `onChange` on the DOM `<input>`.
 * In our case, this is the inline arrow-function in the `TemperatureInput` component.
 *
 * - The `onChange` function in the `TemperatureInput` component calls `props.onTemperatureChange()` with the new desired value.
 * Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
 *
 * - When it previously rendered,
 * the `Calculator` had specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the arrow-function provided,
 * and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is also the arrow-function provided.
 * So either of these two arrow-functions gets called depending on which input we edited.
 *
 * - Inside these arrow-functions, the `Calculator` component asks React to re-render itself by
 * calling `setState()` with the new input value and the current scale of the input we just edited.
 *
 * - React will re-render `Calculator` component and look for changes, to figure out what UI should look like.
 * The values of both inputs are recomputed based on the current temperature and the active scale.
 * The temperature conversion is performed here.
 *
 * - React will re-render each inividual `TemperatureInput` components with their new props specified by the `Calculator`.
 * It lerns what their UI should look like.
 *
 * - React will re-render `BoilingVerdict` component, passing the temperature in Celsius as its props.
 *
 * - React DOM updates the DOM with the boiling verdict and to match the desired input values.
 * The input we just edited receives its current value,
 * and the other input is updated to the temperature after conversion.
 *
 * Every update goes through the same steps so the inputs stay in sync.
 *
 */

/**
 * **Lessons Learned**
 *
 * There should be a single “source of truth” for any data that changes in a React application.
 * Usually, the state is first added to the component that needs it for rendering.
 * Then, if other components also need it, you can lift it up to their closest common ancestor.
 * Instead of trying to sync the state between different components,
 * you should rely on the [top-down data flow](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down).
 *
 * Lifting state involves writing more “boilerplate” code than two-way binding approaches,
 * but as a benefit, it takes less work to find and isolate bugs.
 * Since any state “lives” in some component and that component alone can change it,
 * the surface area for bugs is greatly reduced.
 * Additionally, you can implement any custom logic to reject or transform user input.
 *
 * If something can be derived from either props or state, it probably shouldn’t be in the state.
 * For example, instead of storing both `celsiusValue` and `fahrenheitValue`,
 * we store just the last edited `temperature` and its `scale`.
 * The value of the other input can always be calculated from them when it is re-rendered.
 * This lets us clear or apply rounding to the other field without losing any precision in the user input.
 *
 * When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools)
 * to inspect the props and move up the tree until you find the component responsible for updating the state.
 * This lets you trace the bugs to their source.
 */
