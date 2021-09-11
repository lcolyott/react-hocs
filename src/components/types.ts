import React from "react";

// If the injected props don't exist on ComponentProps, the cast will fail and throw an error
// By casting a component type to this type, 
// we can create a check to see if injected props exists on component props
export type ConsistentWith<ComponentProps, InjectedProps> = {
    [P in keyof ComponentProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends ComponentProps[P]
    ? ComponentProps[P]
    : InjectedProps[P]
    : ComponentProps[P]
};

// Omit injected props from component props
// This hides injected props from being overridden on tags
export type WithInjection<ComponentProps, InjectedProps, AdditionalProps = {}> = React.ComponentType<
    Omit<
        ComponentProps,
        keyof InjectedProps
    > & AdditionalProps
>;

// Return a component that has injected props omitted
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
        > (Component: C) => WithInjection<React.ComponentProps<C>, InjectedProps, AdditionalProps>;