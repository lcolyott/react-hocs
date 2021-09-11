import React, { useEffect } from 'react';
import { UncontrolledWidget, ScriptInjectedWidget } from './components';

import './App.scss';
import { PropInjector, WithProps } from './components/types';

//#region Test Components
// interface TestComponentProps {
//   name: string;
//   description: string;
//   additionalProps?: {};
// };

// const TestComponent: React.FunctionComponent<TestComponentProps> = (props) => {
//   return (
//     <div>
//       TEST COMPONENT
//       {props.name}
//       {props.description}
//       {props.children}
//     </div>
//   );
// };

// const withInjection: PropInjector<{ description: string }> = (Component) => Component as WithProps<React.ComponentProps<typeof Component>, { description: string }>;

// const InjectedTestComponent = withInjection(TestComponent);
//#endregion

//#region App Components
function ResponsiveApp() {
  return (
    <div className={"App-Responsive"}>
      <ScriptInjectedWidget />
    </div>
  );
};
//#endregion

function App() {
  return (
    <div className={"App"}>
      <div className="Layout">
        <ResponsiveApp />
      </div>
    </div>
  );
};

export default App;
