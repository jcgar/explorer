import React from 'react';
import './App.css';

import { initI18n } from './use/i18n/useI18n'
import TreeCompose from "./compose/TreeCompose"
import Layout from './components/layout/Layout';

function App() {
  initI18n()

  return (
    <div className="App">
      <Layout>
        <TreeCompose />
      </Layout>
    </div>
  );
}

export default App;
