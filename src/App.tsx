import React from 'react';
import { ScriptInjectedWidget, HookedWidget } from './components';

import './App.scss';

//#region App Components
function ResponsiveApp() {
  return (
    <div className={"App-Responsive"}>
      <HookedWidget title={"Hooked Widget"} />
      <ScriptInjectedWidget title={"Context Widget"} />
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
