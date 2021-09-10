import React, { useEffect } from "react";
import { scriptContext } from "../../../context/script";
import { WidgetProps } from "../types";
import "../index.scss";

const Widget: React.FunctionComponent<WidgetProps> = (props) => {
    return (
        <div className={"Widget"}>
            {props.children}
            {`<script src='${props.script ?? ""}'/>`}
        </div>
    );
};

interface WithScriptState {
    script?: string;
}

const withScript = (Widget: React.ComponentType<WidgetProps>) => {
    const ScriptInjectedWidget: React.FunctionComponent<
        Omit<
            WidgetProps,
            "script"
        >
    > = (props) => {
        const context = React.useContext(scriptContext);
        const [mounted, setMounted] = React.useState<boolean>(false);
        const [state, setState] = React.useState<Partial<WithScriptState>>({
            script: undefined,
        });

        const handleScriptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            (event.target.value !== state.script) && context.onScriptChange?.(event.target.value);
        };

        // Memos will run on render
        const renderWidget = React.useMemo(() => {
            console.log(`%c Injected Widget Rerendered! (memo)`, 'background: green; color: #000');
            console.log(state);

            return (
                <Widget script={state.script} >
                    <div>
                        <span>Injected Script: </span>
                        <input
                            type={"text"}
                            value={state.script}
                            onChange={handleScriptChange}
                        />
                        {props.children}
                    </div>
                </Widget>
            );
        }, [mounted, state.script]);

        useEffect(() => {
            console.log("%c Mounting Injected Widget! (useEffect)", 'background: green; color: #000')

            return function cleanup() {
                console.log("%c Injected Widget Mounted! (useEffect)", 'background: green; color: #000')

                setMounted(true);
            }
        }, [])

        // useEffects runs on update which is always after render
        // By having a local script as well as the context value, we can make this useEffect depend on context
        // and the memo depend on the local script, which is only ever set by this useEffect. 
        // Therefor, we can constrain the memo to only run AFTER the useEffect and control our flow of data
        // NOTE: The first render doesn't apply to these rules. The memos will still run first initially.
        useEffect(() => {
            console.log("%c Injected Script Changed! (useEffect)", 'background: green; color: #000');

            setState({
                script: context.script
            });
        }, [context.script]);

        return renderWidget;
    };

    return ScriptInjectedWidget;
};

const ScriptInjectedWidget = withScript(Widget);

export default ScriptInjectedWidget;