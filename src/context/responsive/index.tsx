import React from "react";

export const responsiveContext = React.createContext<{}>({});

const Provider = responsiveContext.Provider;
export const ResponsiveConsumer = responsiveContext.Consumer;

const ResponsiveProvider: React.FunctionComponent<{}> = (props) => {
    return (
        <Provider
            value={{

            }}
            {...props}
        />
    );
}