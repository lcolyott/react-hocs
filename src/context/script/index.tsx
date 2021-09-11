import React, { useEffect } from "react";
import { fetchScriptsAsync } from "../../api";

export const scriptContext = React.createContext<{
    script?: string,
    onScriptChange?: (script: string) => void;
}>({});

const Provider = scriptContext.Provider;

export const ScriptConsumer = scriptContext.Consumer;

export const ScriptProvider: React.FunctionComponent<{}> = (props) => {
    const [script, setScript] = React.useState<string | undefined>(undefined);

    // Load the scripts into the context and pass it to necessary components
    useEffect(() => {
        fetchScriptsAsync().then((string) => {
            setScript(string);
        }).catch((script) => {
            setScript(undefined);
        }).finally(() => {
            console.log("%c Finished Fetching Script!", "color: cyan");
        });
    }, []);

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