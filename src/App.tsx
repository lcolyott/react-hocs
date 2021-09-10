import React, { useEffect } from 'react';
import { UncontrolledWidget, ScriptInjectedWidget } from './components';

import './App.scss';

function StaticApp() {
  return (
    <div className={"App-Static"}>
      <UncontrolledWidget />
    </div>
  );
};

function ResponsiveApp() {
  return (
    <div className={"App-Responsive"}>
      <ScriptInjectedWidget />
    </div>
  );
};

function App() {
  return (
    <div className={"App"}>
      <div className="Layout">
        <StaticApp />
        <ResponsiveApp />
      </div>
    </div>
  );
};



export default App;
