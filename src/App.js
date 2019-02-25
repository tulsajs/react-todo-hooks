import React from 'react';
import ClassApp from './classes/ClassApp';
import HookApp from './hooks/HookApp';

const ENABLE_HOOKS = false;

function App() {
  return ENABLE_HOOKS ? <HookApp /> : <ClassApp />;
}

export default App;
