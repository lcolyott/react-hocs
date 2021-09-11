import React, { useEffect } from "react";
import { WidgetProps } from "./types";

const useScript = (src: string): string | undefined => {
    const [script, setScript] = React.useState<string | undefined>(undefined);

    // This useEffect will only be called on a mount or on 'src' change
    // Every time the src is changed, we will delete the old script element and insert a new one
    useEffect(() => {
        const script = document.createElement('script', { is: 'script' });

        script.id = "injected-script";
        script.src = src;
        script.async = true;

        document.body.appendChild(script);

        // Fake an api call
        setTimeout(() => {
            setScript(src);
        }, 5000);

        src && console.log("%c Script Set! (useEffect)", 'color: green');

        // On cleanup, remove the current script tag from the body
        return function cleanup() {
            document.body.removeChild(script);

            setScript(undefined);
        };
    }, [src]);

    return script;
};

const withScript = (Widget: React.ComponentType<WidgetProps>, src: string | undefined) => {
    const ScriptInjectedWidget: React.FunctionComponent<
        Omit<
            WidgetProps,
            "script"
        >
    > = (props) => {
        const script = useScript(src ?? "");

        useEffect(() => {
            console.log("%c Injected Widget Mounted! (useEffect)", 'color: green')

            return function cleanup() {
                console.log("%c Injected Widget Unmounted! (useEffect)", 'color: crimson')
            }
        }, [])

        // Memos will run on render
        const renderWidget = React.useMemo(() => {
            return (
                <Widget script={script} {...props} />
            );
        }, [script]);

        return renderWidget;
    };

    return ScriptInjectedWidget;
};

export { useScript, withScript };