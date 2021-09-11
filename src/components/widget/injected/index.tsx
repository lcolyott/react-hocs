import React, { useEffect } from "react";
import { scriptContext } from "../../../context/script";
import { WidgetProps } from "../types";
import "../index.scss";

const Widget: React.FunctionComponent<WidgetProps> = (props) => {
    return (
        <div className={"Widget"}>
            <div className={"Widget-Header"}>

            </div>
            <div className={"Widget-Body"}>
                {props.children}
                {!props.script ? (
                    <div className={"Widget-Spinner"}>
                        Loading...
                    </div>
                ) : (
                    <div>
                        Script: {props.script}
                    </div>
                )
                }
            </div>
            <div className={"Widget-Footer"}>
                <div className={"ActionButton"} >
                    Submit
                </div>
                <div className={"ActionButton"} >
                    Cancel
                </div>
            </div>
        </div>
    );
};

interface WithScriptState {
    script?: string;
};

const withScript = (Widget: React.ComponentType<WidgetProps>) => {
    const ScriptInjectedWidget: React.FunctionComponent<
        Omit<
            WidgetProps,
            "script"
        >
    > = (props) => {
        const context = React.useContext(scriptContext);
        const [state, setState] = React.useState<Partial<WithScriptState>>({
            script: "",
        });

        useEffect(() => {
            console.log("%c Injected Widget Mounted! (useEffect)", 'color: green')

            return function cleanup() {
                console.log("%c Injected Widget Unmounted! (useEffect)", 'color: crimson')
            }
        }, [])

        // useEffects runs on update which is always after render
        // By having a local script as well as the context value, we can make this useEffect depend on context
        // and the memo depend on the local script, which is only ever set by this useEffect. 
        // Therefor, we can constrain the memo to only run AFTER the useEffect and control our flow of data
        // NOTE: The first render doesn't apply to these rules. The memos will still run first initially.
        useEffect(() => {
            console.log("%c Injected Script Changed! (useEffect)", 'color: chartreuse');

            setState({
                script: context.script
            });
        }, [context.script]);

        // Memos will run on render
        const renderWidget = React.useMemo(() => {
            console.log(`%c Injected Widget Rerendered! (memo)`, 'color: chartreuse');

            return (
                <Widget script={state.script} />
            );
        }, [state.script]);

        return renderWidget;
    };

    return ScriptInjectedWidget;
};

const ScriptInjectedWidget = withScript(Widget);

export default ScriptInjectedWidget;