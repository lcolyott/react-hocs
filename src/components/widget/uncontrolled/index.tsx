import React, { useEffect } from "react";
import { WidgetProps } from "../types";
import "../index.scss";

const UncontrolledWidget: React.FunctionComponent<WidgetProps> = (props) => {
    const [script, setScript] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        console.log("%c Uncontrolled Widget Mounted (useEffect)", 'background: yellow; color: #000')
    }, [])

    useEffect(() => {
        console.log(`%c Uncontrolled Script Changed! (useEffect)`, 'background: yellow; color: #000');;
    }, [script]);

    const handleScriptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScript(event.target.value);
    };

    return (
        <div className={"Widget"}>
            {console.log(`%c Uncontrolled Widget Rendered! (render)`, 'background: yellow; color: #000')}
            {props.children}
            <div>
                <span>Local Script: </span>
                <input
                    type={"text"}
                    value={script}
                    onChange={handleScriptChange}
                />
                {props.children}
            </div>
            {`<script src='${props.script ?? ""}'/>`}
        </div>
    );
};

export default UncontrolledWidget;