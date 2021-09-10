import React from "react";

export const scriptContext = React.createContext<{
    script?: string,
    onScriptChange?: (script: string) => void;
}>({});

const Provider = scriptContext.Provider;

export const ScriptConsumer = scriptContext.Consumer;

export const ScriptProvider: React.FunctionComponent<{}> = (props) => {
    const [script, setScript] = React.useState<string>("DEFAULT SCRIPT");

    const onScriptChange = (script: string) => {
        setScript(script);
    };

    return (
        <Provider
            {...props}
            value={{
                script,
                onScriptChange
            }}
        />
    );
};