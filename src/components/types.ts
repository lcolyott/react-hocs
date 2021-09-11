import React from "react";

export type ConsistentWith<ComponentProps, InjectedProps> = {
    [P in keyof ComponentProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends ComponentProps[P]
    ? ComponentProps[P]
    : InjectedProps[P]
    : ComponentProps[P]
};

export type WithProps<ComponentProps, InjectedProps, AdditionalProps = {}> = React.ComponentType<
    Omit<
        ComponentProps,
        keyof InjectedProps
    > & AdditionalProps
>;

export type PropInjector<
    InjectedProps,
    AdditionalProps = {}
    > = <
        C extends React.ComponentType<
            ConsistentWith<
                React.ComponentProps<C>,
                keyof InjectedProps
            >
        >,
        > (Component: C) => WithProps<React.ComponentProps<C>, InjectedProps, AdditionalProps>;