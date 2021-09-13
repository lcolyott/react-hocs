import React, { useEffect } from "react";
import { WidgetProps } from "../types";
import "../index.scss";
import clsx from "clsx";

const BaseWidget: React.FunctionComponent<WidgetProps> = (props) => {
    const classes: Record<string, string> = {
        "Widget": clsx(props.script ? "Widget--idle" : "Widget--loading"),
        "Header": clsx(""),
        "Body": clsx(""),
        "Footer": clsx(""),
        "Spinner": clsx("")
    };

    useEffect(() => {
        console.log(`%c Mounted! (${props.title ?? "Base Widget"}: useEffect)`, 'color: yellow');

        return function cleanup() {
            console.log(`%c Unmounted! (${props.title ?? "BaseWidget"}: useEffect)`, 'color: crimson');
        }
    }, [])

    useEffect(() => {
        console.log(`%c Script Changed! (${props.title ?? "BaseWidget"}: useEffect)`, 'color: yellow');
    }, [props.script]);

    console.log(`%c ${props.title ?? "BaseWidget"} Rendering! (render)`, 'color: charteuse');

    return (
        <div className={classes["Widget"]}>
            <div className={"Header"}>
                {props.title}
            </div>
            <div className={"Body"}>
                {props.children}
                {
                    !props.script ? (
                        <div className={"Spinner"}>
                            <div className={"Spinner-Text"}>
                                Loading...
                            </div>
                        </div>
                    ) : (
                        <React.Fragment>
                            <div>
                                Script: {props.script}
                            </div>
                            <div className={"test-main"} >
                                Main Palette
                            </div>
                            <div className={"test-light"} >
                                Light Palette
                            </div>
                            <div className={"test-dark"} >
                                Dark Palette
                            </div>
                        </React.Fragment>

                    )
                }
            </div>
            <div className={"Footer"}>
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

export default BaseWidget;