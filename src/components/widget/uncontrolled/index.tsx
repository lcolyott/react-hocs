import React, { useEffect } from "react";
import { WidgetProps } from "../types";
import "../index.scss";

const UncontrolledWidget: React.FunctionComponent<WidgetProps> = (props) => {
    const [script, setScript] = React.useState<string | undefined>("");

    useEffect(() => {
        console.log("%c Uncontrolled Widget Mounting (useEffect)", 'background: yellow; color: #000');

        return function cleanup() {
            console.log("%c Uncontrolled Widget Mounted (useEffect)", 'background: yellow; color: #000');
        }
    }, [])

    useEffect(() => {
        console.log(`%c Uncontrolled Script Changed! (useEffect)`, 'background: yellow; color: #000');;
    }, [script]);

    const handleScriptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScript(event.target.value);
    };

    return (
        <div className={"Widget"}>
            <div className={"Widget-Header"}>

            </div>
            <div className={"Widget-Body"}>
                <span>Local Script: </span>
                <input
                    type={"text"}
                    value={script}
                    onChange={handleScriptChange}
                />
                <br />
                Script: {script}
                {props.children}
            </div>
            <div className={"Widget-Footer"}>

            </div>
        </div>
    );
};

export default UncontrolledWidget;