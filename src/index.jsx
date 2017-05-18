import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import { AppContainer } from 'react-hot-loader'

const render = App => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#app')
  )
}

render(Layout)

if (module.hot) {
  module.hot.accept('./components/Layout', () => { render(Layout) })
}
